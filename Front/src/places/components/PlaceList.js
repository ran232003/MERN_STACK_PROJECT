import React from 'react'
import PlaceItem from './PlaceItem'

import './PlaceList.css'

const PlaceList = (props)=>{
 

    return(
        <div className = "places-list">
            {props.items.length === 0?
            <div className = "center">
                <h2>
                    No Places Found
                </h2>
                <button>
                    Add Place
                </button>
            </div>:
            <ul place-list>
                {props.items.map((item)=>{
                    return(
                        <PlaceItem
                        visitorId = {props.id}
                        key = {item._id}
                        id = {item._id}
                        image = {item.image}
                        desc = {item.desc}
                        address = {item.address}
                        coordinates = {item.location}
                        creatorId = {item.creatorId}
                        />
                    )
                })}
            </ul>
            }
        </div>
    )

}
export default PlaceList;