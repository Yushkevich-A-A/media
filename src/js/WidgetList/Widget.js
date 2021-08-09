import DrawAudioPost from "./DrawAudioPost/DrawAudioPost";
import DrawTextPost from "./DrawTextPost/DrawTextPost";
import DrawVideoPost from "./DrawVideoPost/DrawVideoPost";
import DrawWidget from "./DrawWidget/DrawWidget";
import ErrorBlock from "./ErrorBlock/ErrorBlock";
import ErrorPermissions from "./ErrorPermissions/ErrorPermissions";


const errorPermissions = new ErrorPermissions();
const textPost = new DrawTextPost();
const audioPost = new DrawAudioPost();
const videoPost = new DrawVideoPost();
const errorBlock = new ErrorBlock();
const widget = new DrawWidget(errorBlock, 
                              errorPermissions, 
                              textPost, 
                              audioPost, 
                              videoPost);
