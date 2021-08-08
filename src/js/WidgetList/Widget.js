import DrawAudioPost from "./DrawAudioPost/DrawAudioPost";
import DrawTextPost from "./DrawTextPost/DrawTextPost";
import DrawVideoPost from "./DrawVideoPost/DrawVideoPost";
import DrawWidget from "./DrawWidget/DrawWidget";
import ErrorBlock from "./ErrorBlock/ErrorBlock";


const textPost = new DrawTextPost();
const audioPost = new DrawAudioPost();
const videoPost = new DrawVideoPost();
const errorBlock = new ErrorBlock();
const widget = new DrawWidget(errorBlock, textPost, audioPost, videoPost);
