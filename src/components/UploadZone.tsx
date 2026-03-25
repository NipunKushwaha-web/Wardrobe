import React from 'react';
import styles from '../styles/CSS/UploadZone.module.css';
import type { useFileUpload } from '../hooks/useFileUpload';

type UploadHook = ReturnType<typeof useFileUpload>;

interface UploadZoneProps extends Pick<UploadHook, 'imageData' | 'isDragging' | 'inputRef' | 'onFileChange' | 'onDragOver' | 'onDragLeave' | 'onDrop'> {}

export const UploadZone: React.FC<UploadZoneProps> = ({
  imageData, isDragging, inputRef, onFileChange, onDragOver, onDragLeave, onDrop,
}) => (
  <div
    className={`${styles.zone} ${isDragging ? styles.dragging : ''}`}
    onDragOver={onDragOver}
    onDragLeave={onDragLeave}
    onDrop={onDrop}
    onClick={() => inputRef.current?.click()}
    role="button"
    tabIndex={0}
    aria-label="Upload clothing photo"
    onKeyDown={e => e.key === 'Enter' && inputRef.current?.click()}
  >
    <input
      ref={inputRef}
      type="file"
      accept="image/*"
      className={styles.hiddenInput}
      onChange={onFileChange}
      aria-hidden="true"
    />

    {imageData ? (
      <img src={imageData} alt="Preview" className={styles.preview} />
    ) : (
      <div className={styles.placeholder}>
        <svg className={styles.icon} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2">
          <rect x="6" y="6" width="36" height="36" rx="2" />
          <line x1="24" y1="16" x2="24" y2="32" />
          <line x1="16" y1="24" x2="32" y2="24" />
        </svg>
        <span className={styles.label}>
          {isDragging ? 'Release to upload' : 'Drop clothing photo here'}
        </span>
        <span className={styles.sub}>or click to browse — JPG, PNG, WEBP</span>
      </div>
    )}
  </div>
);
