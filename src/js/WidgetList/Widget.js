import DrawAudioPost from "./DrawAudioPost/DrawAudioPost";
import DrawTextPost from "./DrawTextPost/DrawTextPost";
import DrawVideoPost from "./DrawVideoPost/DrawVideoPost";
import DrawWidget from "./DrawWidget/DrawWidget";
import HandlerCoordBlock from "./HandlerCoordBlock/HandlerCoordBlock";
import ErrorPermissions from "./ErrorPermissions/ErrorPermissions";


const errorPermissions = new ErrorPermissions();
const textPost = new DrawTextPost();
const audioPost = new DrawAudioPost();
const videoPost = new DrawVideoPost();
const handlerCoordBlock = new HandlerCoordBlock();
const widget = new DrawWidget(handlerCoordBlock, 
                              errorPermissions, 
                              textPost, 
                              audioPost, 
                              videoPost);
