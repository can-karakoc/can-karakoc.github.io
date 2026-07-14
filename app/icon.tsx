import { ImageResponse } from 'next/og';

// Generate favicon using orb gradient
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'radial-gradient(circle at 34% 26%, #eaf6ff, #7fd0f5 20%, #2b8fe0 52%, #1746b8 100%)',
          borderRadius: '50%',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '6px',
            left: '10px',
            width: '8px',
            height: '6px',
            background: 'rgba(255,255,255,0.9)',
            borderRadius: '50%',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
