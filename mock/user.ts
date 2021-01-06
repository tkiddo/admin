/*
 * @Author: tkiddo
 * @Date: 2021-01-06 13:44:41
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-06 13:52:43
 * @Description:
 */

import { Constant } from './_utils';
import { Request, Response } from 'umi';

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
      res.json({ success: true, message: 'Ok' });
    } else {
      res.status(400).end();
    }
  },
};
