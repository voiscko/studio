// study-schedule-generator.ts
'use server';

/**
 * @fileOverview AI agent that generates study schedules based on user inputs.
 *
 * - generateStudySchedule - A function that generates study schedules.
 * - StudyScheduleInput - The input type for the generateStudySchedule function.
 * - StudyScheduleOutput - The return type for the generateStudySchedule function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StudyScheduleInputSchema = z.object({
  courses: z
    .array(
      z.object({
        name: z.string().describe('The name of the course.'),
        workload: z.number().describe('The estimated workload for the course in hours per week.'),
      })
    )
    .describe('A list of courses the user is taking.'),
  assignments: z
    .array(
      z.object({
        title: z.string().describe('The title of the assignment.'),
        deadline: z.string().describe('The deadline for the assignment (YYYY-MM-DD).'),
        estimatedTime: z.number().describe('The estimated time to complete the assignment in hours.'),
      })
    )
    .describe('A list of assignments the user has to complete.'),
  availableHoursPerDay: z
    .number()
    .describe('The number of hours the user has available to study each day.'),
});
export type StudyScheduleInput = z.infer<typeof StudyScheduleInputSchema>;

const StudyScheduleOutputSchema = z.object({
  schedule: z
    .array(
      z.object({
        date: z.string().describe('The date for this schedule entry (YYYY-MM-DD).'),
        tasks: z
          .array(
            z.object({
              course: z.string().describe('The course the task is for.'),
              assignment: z.string().optional().describe('The assignment the task is for, if applicable.'),
              description: z.string().describe('A description of the task.'),
              duration: z.number().describe('The duration of the task in hours.'),
            })
          )
          .describe('A list of tasks for this date.'),
      })
    )
    .describe('The generated study schedule.'),
});
export type StudyScheduleOutput = z.infer<typeof StudyScheduleOutputSchema>;

export async function generateStudySchedule(input: StudyScheduleInput): Promise<StudyScheduleOutput> {
  return studyScheduleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'studySchedulePrompt',
  input: {schema: StudyScheduleInputSchema},
  output: {schema: StudyScheduleOutputSchema},
  prompt: `You are a study schedule generator. Given the courses, assignments, and available hours, generate an optimal study schedule.

Courses:
{{#each courses}}
- Course: {{this.name}}, Workload: {{this.workload}} hours/week
{{/each}}

Assignments:
{{#each assignments}}
- Title: {{this.title}}, Deadline: {{this.deadline}}, Estimated Time: {{this.estimatedTime}} hours
{{/each}}

Available Hours Per Day: {{availableHoursPerDay}}

Generate a study schedule that maximizes efficiency and balances the workload across courses and assignments.  The schedule should start from tomorrow and extend until all assignments are completed, if possible.  If there is more time than needed to complete the assignments, extend the schedule to two weeks. Do not exceed the number of available hours per day. Dates should be in YYYY-MM-DD format.

Ensure that the generated schedule includes specific tasks for each day, allocating time for each task appropriately. Each task should have a course, description, and duration in hours. If a task is related to a specific assignment, then it should include the assignment's name.
`, 
});

const studyScheduleFlow = ai.defineFlow(
  {
    name: 'studyScheduleFlow',
    inputSchema: StudyScheduleInputSchema,
    outputSchema: StudyScheduleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
