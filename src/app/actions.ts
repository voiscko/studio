'use server';

import { generateStudySchedule, type StudyScheduleInput, type StudyScheduleOutput } from '@/ai/flows/study-schedule-generator';
import { z } from 'zod';

const StudyScheduleInputClientSchema = z.object({
  courses: z.array(z.object({ 
      name: z.string().min(1, 'Course name is required'), 
      workload: z.coerce.number().min(1, 'Workload must be at least 1 hour') 
    })).min(1, 'At least one course is required'),
  assignments: z.array(z.object({
      title: z.string().min(1, 'Assignment title is required'),
      deadline: z.string().min(1, 'Deadline is required'),
      estimatedTime: z.coerce.number().min(0.5, 'Estimated time must be at least 0.5 hours')
    })),
  availableHoursPerDay: z.coerce.number().min(1, 'Available hours must be at least 1').max(24, 'Cannot be more than 24 hours'),
});

export async function getStudySchedule(input: StudyScheduleInput): Promise<{ schedule: StudyScheduleOutput | null; error: string | null }> {
  const parsed = StudyScheduleInputClientSchema.safeParse(input);
  if (!parsed.success) {
    // Flatten Zod errors into a single string.
    const errorMessage = parsed.error.issues.map(issue => `${issue.path.join('.')} - ${issue.message}`).join('; ');
    return { schedule: null, error: `Invalid input: ${errorMessage}` };
  }

  try {
    const schedule = await generateStudySchedule(parsed.data);
    return { schedule, error: null };
  } catch (e) {
    console.error(e);
    return { schedule: null, error: 'Failed to generate schedule due to an unexpected error. Please try again.' };
  }
}
