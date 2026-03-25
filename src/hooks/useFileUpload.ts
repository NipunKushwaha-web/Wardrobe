import { useState, useRef, useCallback, type DragEvent, type ChangeEvent } from 'react';

export function useFileUpload() {
  const [imageData, setImageData] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const loadFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = e => setImageData(e.target?.result as string ?? null);
    reader.readAsDataURL(file);
  }, []);

  const onFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) loadFile(file);
  }, [loadFile]);

  const onDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback(() => setIsDragging(false), []);

  const onDrop = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) loadFile(file);
  }, [loadFile]);

  const reset = useCallback(() => {
    setImageData(null);
    if (inputRef.current) inputRef.current.value = '';
  }, []);

  return { imageData, isDragging, inputRef, onFileChange, onDragOver, onDragLeave, onDrop, reset };
}
