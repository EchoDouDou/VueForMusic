import * as types from './mutation-type'
import {playMode} from "../common/js/config";
import {shufle} from "../common/js/util";
import {saveSearch,deleteSearch,clearSearch,savePlay,saveFavorite,deleteFavorite} from "../common/js/cache";

function findIndex(list,song) {
  return list.findIndex((item)=>{
    return item.id === song.id
  })
}
export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list)
  if (state.mode === playMode.random) {
    let randomList = shufle(list)
    commit(types.SET_PLAY_LIST, randomList)
    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAY_LIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const randomPlay = function ({commit},{list}) {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  let randomList = shufle(list)
  commit(types.SET_PLAY_LIST, randomList)
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const insertSong = function ({commit,state},song) {
  let playList = state.playList.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  let currentSong = playList[currentIndex]
  let fpIndex = findIndex(playList,song)
  currentIndex++
  //插入歌曲
  playList.splice(currentIndex,0,song)
  //插入该歌曲到当前索引
  if(fpIndex>-1){
    if(currentIndex>fpIndex){
      playList.splice(fpIndex,1)
      currentIndex--
    }else{
      playList.splice(fpIndex+1,1)
    }
  }
  let currentSIndex = findIndex(sequenceList,currentSong) +1
  let fsIndex = findIndex(sequenceList,song)
  sequenceList.splice(currentSIndex,0,song)
  if(fpIndex>-1){
    if(currentSIndex>fsIndex){
      sequenceList.splice(fsIndex,1)
      currentSIndex--
    }else{
      sequenceList.splice(fsIndex+1,1)
    }
  }
  commit(types.SET_PLAY_LIST,playList)
  commit(types.SET_SEQUENCE_LIST,sequenceList)
  commit(types.SET_CURRENT_INDEX,currentIndex)
  commit(types.SET_FULL_SCREEN,true)
  commit(types.SET_PLAYING_STATE,true)
}

export const saveSearchHistory = function ({commit},query) {
  commit(types.SET_SEARCH_HISTORY,saveSearch(query))
}

export const deleteSearchHistory = function ({commit},query) {
  commit(types.SET_SEARCH_HISTORY,deleteSearch(query))
}

export const clearSearchHistory = function ({commit}) {
  commit(types.SET_SEARCH_HISTORY,clearSearch())
}

export const deleteSong = function ({commit,state},song) {
  let playList = state.playList.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  let pIndex = findIndex(playList,song)
  playList.splice(pIndex,1)
  let sIndex = findIndex(sequenceList,song)
  sequenceList.splice(sIndex,1)
  if(currentIndex>pIndex || currentIndex === playList.length){
    currentIndex--
  }
  commit(types.SET_PLAY_LIST,playList)
  commit(types.SET_SEQUENCE_LIST,sequenceList)
  commit(types.SET_CURRENT_INDEX,currentIndex)
  if(!playList.length){
    commit(types.SET_PLAYING_STATE,false)
  }else{
    commit(types.SET_PLAYING_STATE,true)
  }
}

export const deleteSongList = function ({commit}) {
  commit(types.SET_PLAY_LIST,[])
  commit(types.SET_SEQUENCE_LIST,[])
  commit(types.SET_CURRENT_INDEX,-1)
  commit(types.SET_PLAYING_STATE,false)
}

export const savePlayHistory = function ({commit},song) {
  commit(types.SET_PLAY_HISTORY,savePlay(song))
}

export const saveFavoriteList = function ({commit},song) {
  commit(types.SET_FAVORITE_LIST,saveFavorite(song))
}

export const deleteFavoriteList = function ({commit},song) {
  commit(types.SET_FAVORITE_LIST,deleteFavorite(song))
}
