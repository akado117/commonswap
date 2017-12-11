import React from 'react';


const ImageList = ({images = []}) => {
    const imageList = images.length ? <div className="row">
        {images.map((image) => {
            return <div className="img-wrapper col m4 s6"><img style={{width: '100%', padding: '5px'}} src={image.url} /></div>
        })}
    </div> : <div>'there are no images'</div>;
    return imageList
}

export default ImageList