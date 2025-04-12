import React, { useState } from 'react';
import './Avatar.scss';

interface AvatarProps {
  src?: string;
  userName?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src = '',
  userName = '??',
}) => {
  const [hasError, setHasError] = useState(false);
  const isFallback = !src || hasError;

  const fallback = userName
    ? userName
        .split(' ')
        .map((name) => name[0])
        .slice(0, 2)
        .join('')
        .trim()
    : '??';

  return (
    <div className="avatar">
      {!isFallback ? (
        <img
          className="avatar--image"
          src={src}
          alt="user vatar"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="avatar--fallback">{fallback}</div>
      )}
    </div>
  );
};
