/*
 * @Author: tkiddo
 * @Date: 2021-01-06 13:44:41
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-07 11:06:46
 * @Description:
 */

import { Constant } from './_utils';
import { Request, Response } from 'umi';
import qs from 'qs';

const { ApiPrefix } = Constant;

const users = [
  {
    id: 0,
    username: 'admin',
    password: 'admin',
  },
  {
    id: 1,
    username: 'guest',
    password: 'guest',
  },
];

export default {
  [`POST ${ApiPrefix}/user/login`](req: Request, res: Response): void {
    const { username, password } = req.body;
    const user = users.filter((item) => item.username === username);

    if (user.length > 0 && user[0].password === password) {
      const now = new Date();
      now.setDate(now.getDate() + 1);
      res.cookie(
        'token',
        JSON.stringify({ id: user[0].id, deadline: now.getTime() }),
        {
          maxAge: 900000,
          httpOnly: true,
        },
      );
      res.json({ success: true, message: 'OK' });
    } else {
      res.status(400).end();
    }
  },
  [`GET ${ApiPrefix}/user`](req: Request, res: Response) {
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
};
