import React, { Component } from 'react';

import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Section from 'grommet/components/Section';
import Button from 'grommet/components/Button';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';

import { total } from '../components/GameInfoTable';

export default class Game extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Box>
        <Header>
          <Heading>
            Diamond Bonanza
          </Heading>
        </Header>

       <Tabs>
         <Tab title='Total'>
          {total()}
         </Tab>
         <Tab title='By sprint'>
           Sprint
         </Tab>
         <Tab title="By time interval">
           Choose interval
         </Tab>
       </Tabs>
        
        
      </Box>
    )
  }
}