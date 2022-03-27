import React, { useState } from 'react';
import Popup from './popup';

export default function Item(props){
    const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
    return (
        <div class="card" onClick={togglePopup}>
          <div class="image">
            <img
              src={props.url}
            />
          </div>
          <div class="content">
            <div class="header">{props.name}</div>
          </div>
          <div class="description" style ={{paddingLeft: "5px"}}>{props.price}</div>
          <div class="extra content">
            <span class="right floated">{props.date}</span>
            <span>
              <i class="user icon"></i>
              {props.author}
            </span>
          </div>
          {isOpen && <Popup
        content={<>
          
          <div class="ui two buttons">
        <div class="ui basic green button">Buy</div>
        <div class="ui basic red button">Ignore</div>
      </div>
        </>}
        handleClose={togglePopup} />}
        </div>


    );
}