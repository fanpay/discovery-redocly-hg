import * as React from 'react';

export { GsapHello } from '../components/GsapHello';
export { Quiz } from './components/Quiz';
export function Break() {
  return <br />;
}
export const Video = ({ src, title, width }) => {
  return (
    <div style={{ maxWidth: width, margin: '0 auto' }}>
      <video controls width="100%" title={title}>
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};