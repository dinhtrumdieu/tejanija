import React from 'react';

export const AudioContext = React.createContext({
  audio: {play: false},
  togglePlay: () => {},
});
