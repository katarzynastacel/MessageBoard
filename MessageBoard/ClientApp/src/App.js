import React, { Component,useState,useEffect } from 'react';

import 'bulma/css/bulma.css'
import './custom.css'

import {MessageBoardComponent }from "./components/messageBoard"

export default class App extends Component {
  static displayName = App.name;


  render () {
    return (
  <MessageBoardComponent/>
    );
  }
}
