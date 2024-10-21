import { Editor, EditorProvider } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TipTapMenu from './tiptap-editor/tip-tap-menu.tsx';
import { Control, Controller } from 'react-hook-form';

const extensions = [StarterKit];

export default function TipTapEditor({
  value,
  controlName,
  control,
}: {
  value: string;
  controlName: string;
  control: Control;
}) {
  return (
    <Controller
      name={controlName}
      control={control}
      defaultValue={value}
      render={({ field: { onChange } }) => (
        <EditorProvider
          slotBefore={<TipTapMenu />}
          extensions={extensions}
          content={value}
          onUpdate={({ editor }: { editor: Editor }) => {
            onChange(editor.getHTML());
          }}></EditorProvider>
      )}
    />
  );
}
