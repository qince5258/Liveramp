import { createSlice } from "@reduxjs/toolkit";
import { TermVal } from '../Protype/termPram'

/**
 *  groups: [
 *    {
 *      id: 1
 *      terms:['Age', 'Education']
 *    },
 *    {
 *       id: 2,
 *       terms: ['Age']
 *     }
 *  ]
 * 
 */

const myData = createSlice({
  name: "elementMove",
  initialState: {
    elementName: '',
    groups: [] as any[]
  },
  reducers: {
    dragBegin(state, action) {
      state.elementName = action.payload;
    },
    addGroup(state, action) {
      // 判断是否存在id
      const { id, term = '' } = action.payload || {}
      if (id) {
        //group 里面新增元素
       state.groups?.forEach((group: TermVal) => {
         if (group.id === id) {
           group.term.push(term)
         }
       })
      } else {
        // 新增group
        const newId =  state?.groups.length + 1;
        const newGroup = {
          id: newId,
          term: [term]
        }
        state.groups.push(newGroup)
      }
    },
    removeTerm(state, action) {
      const { id, term } = action.payload || {};
      state.groups.forEach(arg => {
        if (arg.id === id) {
          arg.term = arg.term.filter((name: string) => name !== term)
        }
      })

      state.groups = state.groups.filter((group: TermVal) => {
        return group.term.length > 0
      })
      
    }
  },
});

//导出 action
export const { dragBegin, addGroup, removeTerm } = myData.actions;

//导出异步action 可以处理异步请求 不需要可忽略
// export const pushElementSync = (payload) => {
//   return async (dispatch, getState) => {
//     dispatch(push());
//   };
// };

export default myData.reducer;
