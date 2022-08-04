import React from 'react';
import SideBar from '../SideBar';
import Content from '../Content';
import { Provider } from 'react-redux';
import store from '../../Store';

store.subscribe(Contanier)

/**
 * layout module
 */
export default function Contanier() {
  return (
      <div className="main">
          <Provider store={store} >
            <SideBar />
            <Content />
        </Provider>
    </div>
  );
}
