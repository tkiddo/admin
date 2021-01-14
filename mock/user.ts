/*
 * @Author: tkiddo
 * @Date: 2021-01-06 13:44:41
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-14 15:55:30
 * @Description:
 */

import { Constant } from './_utils';
import { Request, Response } from 'umi';
import Mock from 'mockjs';
import qs from 'qs';

const { ApiPrefix } = Constant;

const usersListData = Mock.mock({
  'data|80-100': [
    {
      id: '@id',
      name: '@name',
      nickName: '@last',
      phone: /^1[34578]\d{9}$/,
      'age|11-99': 1,
      address: '@county(true)',
      isMale: '@boolean',
      email: '@email',
      createTime: '@datetime',
      avatar: '',
    },
  ],
});

const database = usersListData.data;

const EnumRoleType = {
  ADMIN: 'admin',
  DEFAULT: 'guest',
  DEVELOPER: 'developer',
};

const userPermission = {
  DEFAULT: {
    visit: ['1', '2'],
    role: EnumRoleType.DEFAULT,
  },
  ADMIN: {
    role: EnumRoleType.ADMIN,
  },
  DEVELOPER: {
    role: EnumRoleType.DEVELOPER,
  },
};

const users = [
  {
    id: 0,
    username: 'admin',
    password: 'admin',
    permissions: userPermission.ADMIN,
  },
  {
    id: 1,
    username: 'guest',
    password: 'guest',
    permissions: userPermission.DEFAULT,
  },
];

const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null;
  }
  let data;

  for (const item of array) {
    if (item[keyAlias] === key) {
      data = item;
      break;
    }
  }

  if (data) {
    return data;
  }
  return null;
};

const NOTFOUND = {
  message: 'Not Found',
  documentation_url: 'http://localhost:8000/request',
};

export default {
  [`POST ${ApiPrefix}/user/login`](req: Request, res: Response): void {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { username, password } = req.body;
    const user = users.filter((item) => item.username === username);

    if (user.length > 0 && user[0].password === password) {
      const now = new Date();
      now.setDate(now.getDate() + 1);
      res.cookie(
        'token',
        JSON.stringify({ id: user[0].id, deadline: now.getTime() }),
        {
          maxAge: 9000,
          httpOnly: true,
        },
      );
      res.json({ success: true, message: 'OK' });
    } else {
      res.status(400).end();
    }
  },
  [`GET ${ApiPrefix}/user/logout`](req: Request, res: Response): void {
    res.clearCookie('token');
    res.status(200).end();
  },
  [`GET ${ApiPrefix}/user`](req: Request, res: Response) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const cookie = req.headers.cookie || '';
    const cookies = qs.parse(cookie.replace(/\s/g, ''), { delimiter: ';' });
    const response: { [key: string]: unknown } = {};
    let user = {};
    if (!cookies.token) {
      res.status(200).send({ message: 'Not Login' });
      return;
    }
    const token = JSON.parse(cookies.token as string);
    if (token) {
      response.success = token.deadline > new Date().getTime();
    }
    if (response.success) {
      const userItem = users.find((_) => _.id === token.id);
      if (userItem) {
        const { password, ...other } = userItem;
        user = other;
      }
    }
    response.user = user;
    res.json(response);
  },
  [`GET ${ApiPrefix}/users`](req: Request, res: Response) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { query } = req;
    let { pageSize, page, ...other } = query as any;
    pageSize = pageSize || 10;
    page = page || 1;

    let newData = database;
    for (const key in other) {
      if ({}.hasOwnProperty.call(other, key)) {
        newData = newData.filter((item) => {
          if ({}.hasOwnProperty.call(item, key)) {
            if (key === 'address') {
              return other[key].every((iitem) => item[key].indexOf(iitem) > -1);
            } else if (key === 'createTime') {
              const start = new Date(other[key][0]).getTime();
              const end = new Date(other[key][1]).getTime();
              const now = new Date(item[key]).getTime();

              if (start && end) {
                return now >= start && now <= end;
              }
              return true;
            }
            return (
              String(item[key]).trim().indexOf(decodeURI(other[key]).trim()) >
              -1
            );
          }
          return true;
        });
      }
    }
    res.status(200).json({
      data: newData.slice((page - 1) * pageSize, page * pageSize),
      total: newData.length,
    });
  },
  [`GET ${ApiPrefix}/user/:id`](req: Request, res: Response) {
    const { id } = req.params;
    const data = queryArray(database, id, 'id');
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(200).json(NOTFOUND);
    }
  },
};
