import DrawAudioPost from './DrawAudioPost/DrawAudioPost';
import DrawTextPost from './DrawTextPost/DrawTextPost';
import DrawVideoPost from './DrawVideoPost/DrawVideoPost';
import WidgetController from './WidgetController/WidgetController';
import HandlerCoordBlock from './HandlerCoordBlock/HandlerCoordBlock';
import ErrorPermissions from './ErrorPermissions/ErrorPermissions';
import DrawWidget from './DrawWidget/DrawWidget';

const widget = new DrawWidget();
const errorPermissions = new ErrorPermissions();
const textPost = new DrawTextPost();
const audioPost = new DrawAudioPost();
const videoPost = new DrawVideoPost();
const handlerCoordBlock = new HandlerCoordBlock();
const widgetController = new WidgetController(
  widget,
  handlerCoordBlock,
  errorPermissions,
  textPost,
  audioPost,
  videoPost,
);
