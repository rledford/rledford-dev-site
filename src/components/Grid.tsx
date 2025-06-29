import type { Component, JSX } from 'solid-js';

interface GridProps {
  children: JSX.Element;
  cols?: string;
}

const Grid: Component<GridProps> = (props) => {
  const gridCols = () =>
    props.cols || 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4';

  return <div class={`grid ${gridCols()} gap-6`}>{props.children}</div>;
};

export default Grid;
