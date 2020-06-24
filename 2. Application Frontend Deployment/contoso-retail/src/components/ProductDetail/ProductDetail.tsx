// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as React from 'react';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { Icon } from '@fluentui/react/lib/Icon';
import { Button } from '@fluentui/react/lib/Button';
import '../ProductDetail/ProductDetail.scss';
import { IProductDetails, IProductDetailsAPI } from '../../interfaces/IProductDetails';
import AddToCart from '../../helpers/AddToCart';
import { EventSender } from '../EventSender/EventSender';
import Recommendations from '../Recommendations/Recommendations';
import { GET_PRODUCT_DETAILS } from '../../config';
import ItemRecommendations from '../ItemRecommendations/ItemRecommendations';

class ProductDetail extends React.Component<{}, {
    _id?: string,
    _productData: IProductDetailsAPI
}>  {

    private Details: IProductDetails = {
        id: "",
        brand: "",
        productCategory: "",
        productID: "",
        imageURL: "",
        price: 0.00,
        name: "",
        description: "",
    }

    constructor(props: any) {
        super(props);

        if (props.match.params.id !== undefined) {
            this.state = {
                _id: props.match.params.id,
                _productData: {
                    items: [{
                        id: "",
                        brand: "",
                        productCategory: "",
                        productID: "",
                        imageURL: "",
                        price: 0.00,
                        name: "",
                        description: ""
                    }]
                }
            };

            this.Details.productID = props.match.params.id;
            this.loadData(props.match.params.id);

        }

        this.sendToEventHub = this.sendToEventHub.bind(this);
        this.sendToEventHub();
    }

    private async sendToEventHub() {
        let key = "ContosoSynapseDemo";
        let storeData = JSON.parse(sessionStorage.getItem(key));
        var eventClient = new EventSender();
        await eventClient.SendEvent({ "userID": storeData.id, "httpReferer": window.location.href });
    }

    async loadData(id: string) {
        const URI = GET_PRODUCT_DETAILS + id;
        let _data;
        await fetch(URI)
            .then(function (response) {
                return response.json();
            })
            .then(function (parsedData: IProductDetailsAPI) {
                // data here
                _data = parsedData;
            });
        this.Details = _data;

        this.setState({ _productData: _data });
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
                    imageFit={ImageFit.centerCover}
                    height="250px"
                    src={"https://contosoretailimages.blob.core.windows.net/product/" + this.Details.productCategory + "/" + this.Details.imageURL}
                    alt={this.Details.name}
                />
                <div className="product-details">
                    <div className="title-area">
                        <h2 className="product-name">
                            {this.Details.name}
                        </h2>
                        <div className="brand-name">
                            By {this.Details.brand}
                        </div>
                    </div>
                    <h3>What's in the box</h3>
                    <div className="product-description">

                    </div>
                    <div className="price-area">
                        <div id="priceDetail">
                            <div>
                                <div className="price">{"$" + this.Details.price.toString().slice(0, -2)}<sup>{this.Details.price.toString().slice(-2)}</sup></div>
                            </div>
                            <div>
                                <Button
                                    onClick={() => AddToCart(this.Details.productID, this.Details.name, this.Details.brand, this.Details.description, "https://contosoretailimages.blob.core.windows.net/product/" + this.Details.productCategory + "/" + this.Details.imageURL, this.Details.price.toString(), 1)}
                                    primary
                                    iconProps={{ iconName: "Add" }}
                                    text="Add"
                                    color="white" />
                            </div>
                        </div>
                    </div>
                    <div className="title-area">
                        <h2>You Might Also Like</h2>
                    </div>
                        {
                            this.state._id === undefined ?
                            <Recommendations /> :
                            <ItemRecommendations ProductID={Number(this.state._id)} />
                        }
                    </div>
                    <br /><br />
                </div>
        );
    }
}

export default ProductDetail;