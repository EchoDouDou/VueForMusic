import {playMode} from "../common/js/config";
import {loadSearch,loadPlay,loadFavorite} from '../common/js/cache'

const state = {
  singer:{},
  playing:false,
  fullScreen :false,
  playList :[],
  sequenceList:[],
  mode: playMode.sequence,
  currentIndex :-1,
  disc:{},
  topList:{},
  searchHistory:loadSearch(),
  playHistory:loadPlay(), //初始值从缓存里面读
  favoriteList:loadFavorite()
}

export default state
