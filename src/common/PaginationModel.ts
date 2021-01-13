/*
 * @Author: tkiddo
 * @Date: 2021-01-13 10:42:39
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-13 16:05:05
 * @Description:
 */

export interface IPaginationState {
  showSizeChanger: boolean;
  showQuickJumper: boolean;
  current: number;
  total: number;
  pageSize: number;
}
export const PaginationModel = {
  state: {
    list: [],
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      current: 1,
      total: 0,
      pageSize: 10,
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    querySuccess(state, { payload }) {
      const { list, pagination } = payload;
      return {
        ...state,
        list,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      };
    },
  },
};
