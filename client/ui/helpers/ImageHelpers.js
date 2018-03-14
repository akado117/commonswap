import LoadImage from 'blueimp-load-image';
import Pica from 'pica';
import { determineImageDimensions } from '../../../imports/helpers/DataHelpers';
import { MaxImageUploadDim } from '../../../imports/lib/Constants';

export function getOrientation(file, callback) {
    // var reader = new FileReader();
    // reader.onload = function(e) {
    //
    //     var view = new DataView(e.target.result);
    //     if (view.getUint16(0, false) != 0xFFD8) return callback(-2);
    //     var length = view.byteLength, offset = 2;
    //     while (offset < length) {
    //         var marker = view.getUint16(offset, false);
    //         offset += 2;
    //         if (marker == 0xFFE1) {
    //             if (view.getUint32(offset += 2, false) != 0x45786966) return callback(-1);
    //             var little = view.getUint16(offset += 6, false) == 0x4949;
    //             offset += view.getUint32(offset + 4, little);
    //             var tags = view.getUint16(offset, little);
    //             offset += 2;
    //             for (var i = 0; i < tags; i++)
    //                 if (view.getUint16(offset + (i * 12), little) == 0x0112)
    //                     return callback(view.getUint16(offset + (i * 12) + 8, little));
    //         }
    //         else if ((marker & 0xFF00) != 0xFF00) break;
    //         else offset += view.getUint16(offset, false);
    //     }
    //     return callback(-1);
    // };
    // reader.readAsArrayBuffer(file);

    LoadImage.parseMetaData(file, (data) => {
        if (!data.exif) {
            return callback(-1);
        }
        const orientation = data.exif.get('Orientation');
        return callback(orientation);
    });
}

export function rotateImageBasedOnOrientation(orientation, ctx, canvas) {
    if (orientation < 2) return -1;
    console.log('Rotating based upon orientation', orientation);
    const { height, width } = canvas;
    ctx.save();
    if (orientation > 4) {
        canvas.width = height;
        canvas.height = width;
    }
    ctx.translate(canvas.width / 2, canvas.height / 2);
    switch (orientation) {
        case 2:
        // horizontal flip
        //ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        break;
    case 3:
        // 180° rotate left
        //ctx.translate(canvas.width, canvas.height);
        ctx.rotate(Math.PI);
        break;
    case 4:
        // vertical flip
        //ctx.translate(0, canvas.height);
        ctx.scale(1, -1);
        break;
    case 5:
        // vertical flip + 90 rotate right
        ctx.rotate(0.5 * Math.PI);
        ctx.scale(1, -1);
        break;
    case 6:
        // 90° rotate right
        ctx.rotate(0.5 * Math.PI);
        //ctx.translate(0, -canvas.height);
        break;
    case 7:
        // horizontal flip + 90 rotate right
        ctx.rotate(0.5 * Math.PI);
        //ctx.translate(canvas.width, -canvas.height);
        ctx.scale(-1, 1);
        break;
    case 8:
        // 90° rotate left
        ctx.rotate(-0.5 * Math.PI);
        //ctx.translate(-canvas.width, 0);
        break;
    }
}

export function drawtoCanvasFromBlob(ctx, blob, redrawnCanvas, imgDim) {
    return new Promise((res, rej) => {
        const img = new Image();

        img.onload = function() {
            ctx.drawImage(img, - imgDim.width / 2, - imgDim.height / 2);
            //window.image = img;
            //window.cvs = redrawnCanvas;
            //window.ctx = ctx;
            res({ blob, redrawnCanvas });
        };

        img.src = URL.createObjectURL(blob);
    });
}

export function willNeedResize(file, maxDimensionProp) {
    const image = new Image();
    image.src = file.preview;
    const dimensionsObject = determineImageDimensions(image.width, image.height, MaxImageUploadDim[maxDimensionProp]);
    dimensionsObject.image = image;
    return dimensionsObject;
}
export function loadImageResize(file, res, maxPicaDimensionProp) {
    const resizeDims = MaxImageUploadDim[maxPicaDimensionProp] || {};
    const scaleParams = {
        maxWidth: resizeDims.width,
        maxHeight: resizeDims.height,
        orientation: true,
        canvas: true,
    }
    LoadImage(file, (cvs) => {
        cvs.toBlob((blob) => {
            res(blob);
        }, 'image/jpeg', 0.95);
    }, scaleParams);
}

export function picaResizeFunction(file, resizeDimensions, picaOptions, maxPicaDimensionProp) {
    const { width, height, resized, image } = resizeDimensions;
    if (!resized) {
        return file;
    };
    const pica = Pica(['js', 'wasm', 'ww']);
    const offPageCVS = document.createElement('canvas');
    offPageCVS.width = width;
    offPageCVS.height = height;
    let orientation;
    return new Promise((res, rej) => {
    //     getOrientation(file, res);
    // }).then((orient) => {
    //     orientation = orient;
    //     return pica.resize(image, offPageCVS, picaOptions);
    // }).then((result) => {
    //     return pica.toBlob(result, 'image/jpeg', 100);
    // }).then(blob => {
    //     const ctx = offPageCVS.getContext('2d');
    //     if (rotateImageBasedOnOrientation(orientation, ctx, offPageCVS) !== -1) {
    //         return drawtoCanvasFromBlob(ctx, blob, offPageCVS, {width, height});
    //     }
    //     return { blob };
    // }).then(({ blob, redrawnCanvas }) => {
    //     if (redrawnCanvas) {
    //         return pica.toBlob(redrawnCanvas, 'image/jpeg', 100);
    //     }
    //     return blob;
        return loadImageResize(file, res, maxPicaDimensionProp);
    }).then((blob) => {
        blob.name = file.name;
        blob.lastModified = file.lastModified;
        blob.lastModifiedDate = file.lastModifiedDate;
        console.log('resize ran');
        return blob;
    });
}