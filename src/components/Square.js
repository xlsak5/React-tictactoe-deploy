import React from "react";
import "./Square.css";

// Square가 게임 정보 표시
const Square = ({onClick, value}) => {

  // 일단 매개변수 props는 new로 생성해서 나중에 줄거야.
  // constructor(props){
  //   // super(props)가 있어야 / 뒤에 this 사용이 가능함.
  //   super(props);
  //   this.state = {
  //     value: null,
  //   }
  // }

  return(
    <button className="square" onClick={() => {
      onClick()
    }}>
      {value}
    </button>
  )
}

export default Square;
