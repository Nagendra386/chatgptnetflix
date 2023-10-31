import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    
    name:"movies",
    initialState:{
        nowPlayingMovies : null,
        trailerVideo: null,
    },
    reducers:{
        addNowPlayingMovies:(state,action)=>{
            state.nowPlayingMovies = action.payload;
            console.log(state.nowPlayingMovies);
        },
        addTrailerVideo: (state, action) => {
            state.trailerVideo = action.payload;
            console.log(state.trailerVideo)
          },
    },
});



export default movieSlice.reducer;

export const {addNowPlayingMovies,addTrailerVideo} = movieSlice.actions;