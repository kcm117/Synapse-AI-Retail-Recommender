// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as React from 'react';
import '../Home/Home.css';
import { IconButton } from '@fluentui/react/lib/Button';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import Recommendations from '../Recommendations/Recommendations';
import OrderItAgain from '../OrderItAgain/OrderItAgain';
import CategoryRecommendations from '../CategoryRecommendations/CategoryRecommendations';
import { CategoriesOptions } from '../../config';

interface IProps {
}

interface IState {
  cartcount: number;
}

class Home extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      cartcount: 0
    };
  };

  render() {
    return (

      <Pivot aria-label="Catagories">
        <PivotItem
          headerText="Featured"
          headerButtonProps={{
            'data-order': 1,
            'data-title': 'Title',
          }}
        >
          <div className="stack-wrapper hero">
            <Stack horizontal
              horizontalAlign="start"
              wrap={false}>
              <Stack.Item grow>
                <div className="product-panel">
                  <Image
                        style={{ borderTopLeftRadius: "5pt", borderTopRightRadius: "5pt"}}
                     imageFit={ImageFit.cover}
                    alt="Contoso Club Members Take An Extra 10%"
                    src={process.env.PUBLIC_URL + '/assets/Food_Grocery/shopper_happy.jpg'}
                  />
                  <div className="catagory-details">
                    <div className="catagory-name">
                      DEALS &amp; REWARDS
                        </div>
                    <Stack horizontal horizontalAlign="space-between">
                      <p>Contoso Club Members Take An Extra 10%</p>
                      <IconButton iconProps={{ iconName: 'SingleBookmark' }} ariaLabel="Add Bookmark" />
                    </Stack>
                  </div>
                </div>
              </Stack.Item>

              <Stack.Item grow>
                <div className="product-panel">
                  <Image
                        style={{ borderTopLeftRadius: "5pt", borderTopRightRadius: "5pt"}}
                     imageFit={ImageFit.cover}
                    alt="Contoso Club Members Take An Extra 10%"
                    src={process.env.PUBLIC_URL + '/assets/Food_Grocery/eggs.jpg'}
                  />
                  <div className="catagory-details">
                    <div className="catagory-name">
                      DEALS &amp; REWARDS
                    </div>
                    <Stack horizontal horizontalAlign="space-between">
                      <p>Contoso Club Members Take An Extra 10%</p>
                      <IconButton iconProps={{ iconName: 'SingleBookmark' }} ariaLabel="Add Bookmark" />
                    </Stack>
                  </div>
                </div>
              </Stack.Item>

              <Stack.Item grow>
                <div className="product-panel">
                  <Image
                        style={{ borderTopLeftRadius: "5pt", borderTopRightRadius: "5pt"}}
                     imageFit={ImageFit.cover}
                    alt="Contoso Club Members Take An Extra 10%"
                    src={process.env.PUBLIC_URL + '/assets/Food_Grocery/soda.jpg'}
                  />
                  <div className="catagory-details">
                    <div className="catagory-name">
                      DEALS &amp; REWARDS
                        </div>
                    <Stack horizontal horizontalAlign="space-between">
                      <p>Contoso Club Members Take An Extra 10%</p>
                      <IconButton iconProps={{ iconName: 'SingleBookmark' }} ariaLabel="Add Bookmark" />
                    </Stack>
                  </div>
                </div>
              </Stack.Item>
            </Stack>
          </div>

          <Stack className="title-area" horizontal verticalFill horizontalAlign="space-between">
            <h2>Recommended For You</h2>
            <a href="/RecommendedForYou">View Recommended</a>
          </Stack>
          <Recommendations />
          <OrderItAgain /> 

        </PivotItem>
        <PivotItem headerText="Electronics">
          <div className="title-area">
            <h2>Electronics</h2>
          </div>
          <CategoryRecommendations UsesVerticalLayout={true} CategoryName={CategoriesOptions.Electronics} />
        </PivotItem>
        <PivotItem headerText="Home">
          <div className="title-area">
            <h2>Home</h2>
          </div>
          <CategoryRecommendations UsesVerticalLayout={true} CategoryName={CategoriesOptions.Home} />
        </PivotItem>
        <PivotItem headerText="Tools / Hardware">
          <div className="title-area">
            <h2>Outdoor Living</h2>
          </div>
          <CategoryRecommendations UsesVerticalLayout={true} CategoryName={CategoriesOptions.Tools_Hardware} />
        </PivotItem>
        <PivotItem headerText="Outdoor Living">
          <div className="title-area">
            <h2>Outdoor Living</h2>
          </div>
          <CategoryRecommendations UsesVerticalLayout={true} CategoryName={CategoriesOptions.Outdoor_Living} />
        </PivotItem>
      </Pivot>

    );
  }
}

export default Home;