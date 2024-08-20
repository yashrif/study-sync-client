import { InputProps } from '@/components/ui/input';
import React from 'react';
import { useStudyContext } from '@/hooks/useStudyContext';
import { Card, CardContent } from '@/components/ui/card';
import { IconSend2 } from '@tabler/icons-react';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { actions } from '@/assets/data/dashboard/study';
export type ChatAIProps = React.InputHTMLAttributes<HTMLInputElement>;

const ChatAI = React.forwardRef<HTMLInputElement, InputProps>(() => {
  const {
    state: { selectedText },
  } = useStudyContext();

  return (
    <Card className='flex-1 space-y-2 bg-primary-foreground max-w-4xl  mb-2 shadow-xl mx-12 pt-6'>
      <CardContent className='flex flex-col space-y-2'>
        <Textarea className='p-2 text-md' />
        <ScrollArea className='max-h-48 overflow-auto'>
          <p className='text-md text-primary'>
            {(selectedText && '“') + selectedText + (selectedText && '”')}
          </p>
        </ScrollArea>
        <div className='flex justify-between'>
          <div className='flex gap-x-4'>
            {actions.map((name) => (
              <p
                key={name}
                className='text-sm font-semibold text-primary hover:text-foreground cursor-pointer'>
                {name}
              </p>
            ))}
          </div>
          <IconSend2 className='h-7 w-7 text-primary cursor-pointer hover:text-foreground' />
        </div>
      </CardContent>
    </Card>
  );
});

ChatAI.displayName = 'ChatAI';

export { ChatAI };
