// components/common/Dialog.tsx
"use client";
import * as Dialog from "@radix-ui/react-dialog";

export default function MyDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="bg-blue-600 text-white px-4 py-2 rounded">
        Open Dialog
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-800 p-6 rounded-xl">
          <Dialog.Title className="text-white text-lg font-bold">
            Dialog Title
          </Dialog.Title>
          <Dialog.Description className="text-gray-300 mt-2">
            This is a Radix UI dialog.
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
