'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { PlusCircle, XCircle, Bot, Loader } from 'lucide-react';
import type { StudyScheduleInput } from '@/ai/flows/study-schedule-generator';

const formSchema = z.object({
  courses: z.array(z.object({ 
      name: z.string().min(1, 'Course name is required.'), 
      workload: z.coerce.number().min(1, 'Workload must be at least 1 hour.') 
    })).min(1, 'At least one course is required.'),
  assignments: z.array(z.object({
      title: z.string().min(1, 'Assignment title is required.'),
      deadline: z.string().min(1, 'Deadline is required.'),
      estimatedTime: z.coerce.number().min(0.5, 'Estimated time must be at least 0.5 hours.')
    })),
  availableHoursPerDay: z.coerce.number().min(1, 'Available hours must be at least 1.').max(24, 'Cannot be more than 24 hours.'),
});

interface StudyFormProps {
  onGenerateSchedule: (data: StudyScheduleInput) => void;
  isLoading: boolean;
}

export default function StudyForm({ onGenerateSchedule, isLoading }: StudyFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courses: [{ name: '', workload: 5 }],
      assignments: [],
      availableHoursPerDay: 4,
    },
  });

  const { fields: courseFields, append: appendCourse, remove: removeCourse } = useFieldArray({
    control: form.control,
    name: 'courses',
  });

  const { fields: assignmentFields, append: appendAssignment, remove: removeAssignment } = useFieldArray({
    control: form.control,
    name: 'assignments',
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Your Study Plan</CardTitle>
        <CardDescription>
          Add your courses, assignments, and study availability. Our AI will generate an optimal study schedule for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onGenerateSchedule)} className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Courses</h3>
              <div className="space-y-4">
                {courseFields.map((field, index) => (
                  <div key={field.id} className="flex items-start gap-4 p-4 border rounded-lg relative">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                      <FormField
                        control={form.control}
                        name={`courses.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Course Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Computer Science" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`courses.${index}.workload`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Weekly Workload (hours)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="e.g., 10" {...field} />
                            </FormControl>
                             <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                     <Button type="button" variant="ghost" size="icon" onClick={() => removeCourse(index)} className="absolute -top-3 -right-3 bg-card hover:bg-destructive/10 text-muted-foreground hover:text-destructive">
                      <XCircle className="h-5 w-5" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button type="button" variant="outline" onClick={() => appendCourse({ name: '', workload: 5 })} className="mt-4">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Course
              </Button>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-medium mb-4">Assignments</h3>
               <div className="space-y-4">
                {assignmentFields.map((field, index) => (
                   <div key={field.id} className="flex items-start gap-4 p-4 border rounded-lg relative">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
                          <FormField
                              control={form.control}
                              name={`assignments.${index}.title`}
                              render={({ field }) => (
                                  <FormItem>
                                      <FormLabel>Title</FormLabel>
                                      <FormControl><Input placeholder="e.g., Research Paper" {...field} /></FormControl>
                                      <FormMessage />
                                  </FormItem>
                              )}
                          />
                          <FormField
                              control={form.control}
                              name={`assignments.${index}.deadline`}
                              render={({ field }) => (
                                  <FormItem>
                                      <FormLabel>Deadline</FormLabel>
                                      <FormControl><Input type="date" {...field} /></FormControl>
                                      <FormMessage />
                                  </FormItem>
                              )}
                          />
                          <FormField
                              control={form.control}
                              name={`assignments.${index}.estimatedTime`}
                              render={({ field }) => (
                                  <FormItem>
                                      <FormLabel>Time (hours)</FormLabel>
                                      <FormControl><Input type="number" placeholder="e.g., 8" {...field} /></FormControl>
                                      <FormMessage />
                                  </FormItem>
                              )}
                          />
                      </div>
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeAssignment(index)} className="absolute -top-3 -right-3 bg-card hover:bg-destructive/10 text-muted-foreground hover:text-destructive">
                          <XCircle className="h-5 w-5" />
                      </Button>
                  </div>
                ))}
              </div>
              <Button type="button" variant="outline" onClick={() => appendAssignment({ title: '', deadline: '', estimatedTime: 5 })} className="mt-4">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Assignment
              </Button>
            </div>
            
            <Separator />
            
             <FormField
                control={form.control}
                name="availableHoursPerDay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Available Study Hours Per Day</FormLabel>
                    <FormControl>
                      <Input type="number" className="max-w-xs" placeholder="e.g., 3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            <Button type="submit" disabled={isLoading} size="lg" className="w-full sm:w-auto">
              {isLoading ? (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Bot className="mr-2 h-4 w-4" />
              )}
              {isLoading ? 'Generating...' : 'Generate AI Schedule'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
