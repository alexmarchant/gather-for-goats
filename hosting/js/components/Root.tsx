import * as React from 'react';

interface RootProps {}
interface RootState {}

export default class Root extends React.Component<RootProps, RootState> {
  render() {
    return (
      <h1>The Great Goat Gala</h1>
    );
  }
}
