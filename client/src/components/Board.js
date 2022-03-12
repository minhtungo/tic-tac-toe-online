import Square from './Square';

const Board = () => {
  return (
    <div className='board'>
      <div className='row'>
        <Square />
        <Square />
        <Square />
      </div>
      <div className='row'>
        <Square />
        <Square />
        <Square />
      </div>
      <div className='row'>
        <Square />
        <Square />
        <Square />
      </div>
    </div>
  );
};
export default Board;
