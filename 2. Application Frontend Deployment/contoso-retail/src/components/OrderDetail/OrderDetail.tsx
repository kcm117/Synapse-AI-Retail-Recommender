// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as React from 'react';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { Icon } from '@fluentui/react/lib/Icon';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import '../OrderDetail/OrderDetail.scss';
import { EventSender } from '../EventSender/EventSender';
import { IProductItem } from '../../interfaces/IRecommendedItems';
import Recommendations from '../Recommendations/Recommendations';
import { GET_PRODUCT_DETAILS } from '../../config';
import ItemRecommendations from '../ItemRecommendations/ItemRecommendations';


class OrderDetail extends React.Component<{}, {
    _id?: string,
    itemDetails: IProductItem
}>  {

    constructor(props: any) {
        super(props);

        if (props.match.params.id !== undefined) {
            this.state = {
                _id: props.match.params.id,
                itemDetails: {
                    id: "",
                    brand: "Loading...",
                    productCategory: "",
                    imageURL: "",
                    price: 0.00,
                    productID: "",
                    name: "Loading...",
                    description: ""
                }
            }
        }

        this.loadData = this.loadData.bind(this);
        this.loadData(props.match.params.id);

        this.sendToEventHub = this.sendToEventHub.bind(this);
        this.sendToEventHub();
    }
    /**
       * Send to Event Hub for tracking.
       */
    private async sendToEventHub() {
        let key = "ContosoSynapseDemo";
        let storeData = JSON.parse(sessionStorage.getItem(key));
        var eventClient = new EventSender();
        await eventClient.SendEvent({ "userID": storeData.id, "httpReferer": window.location.href });
    }
    /**
       * Load data for UI.
       */
    async loadData(id: string) {
        let resultData;

        const URI = GET_PRODUCT_DETAILS + id;

        await fetch(URI)
            .then(function (response) {
                return response.json();
            })
            .then(function (parsedData) {
                // data here
                resultData = parsedData;
            });

        this.setState({
            itemDetails: resultData
        });
    }

    goBack() {
        window.history.back();
    }
    render() {
        return (
            <div id="ProductDetail">
                <div className="navigationBack">
                    <a onClick={this.goBack}><Icon
                        styles={{ root: { fontSize: "10px", fontWeight: "bold" } }}
                        iconName="ChevronLeft" /> Back</a>
                </div>
                <Image
                    className="detailImage"
                    height="250px"
                    imageFit={ImageFit.centerCover}
                    alt={this.state.itemDetails.name}
                    src={"https://contosoretailimages.blob.core.windows.net/product/" + this.state.itemDetails.productCategory + "/" + this.state.itemDetails.imageURL}
                />
                <div className="product-details">
                    <div className="title-area">
                        <h2 className="product-name">
                            {this.state.itemDetails.name}
                        </h2>
                        <div className="brand-name">
                            By {this.state.itemDetails.brand}
                        </div>
                    </div>
                    <table className="ordertracking" cellPadding="0" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Date &amp; Time</th>
                                <th>Shipping Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>07/24/2020 at 5:32 AM EST</td>
                                <td>Departure Scan</td>
                            </tr>
                            <tr>
                                <td>07/22/2020 at 12:49 PM EST</td>
                                <td>Preparing Shipment</td>
                            </tr>
                            <tr>
                                <td>07/22/2020 at 11:32 AM EST</td>
                                <td>Order Received</td>
                            </tr>
                        </tbody>
                    </table>
                    <div style={{ margin: "20px" }}>
                        <PrimaryButton
                            styles={{ root: { width: "100%" } }}
                            primary text="Get Help" color="white" />
                    </div>
                    <div className="title-area">
                        <h2>You Might Also Like</h2>
                    </div>
                    {
                        this.state._id === undefined ?
                            <Recommendations /> :
                            <div style={{ padding: "20px" }}>
                                <ItemRecommendations ProductID={Number(this.state._id)} />
                            </div>
                    }
                    <br /><br />
                </div>
            </div>
        );
    }
}

export default OrderDetail;