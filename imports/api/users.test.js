import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { validateNewUser } from './users';

if (Meteor.isServer) {
  describe('users', function () {

    it('should allow valid email address', function () {
      const testUser = {
        emails: [
          {
            address: 'test@example.com'
          }
        ]
      };
      const res = validateNewUser(testUser);

      expect(res).toBe(true);
    });

    it('should reject invalid email', function () {
      const testUser = {
        emails: [
          {
            address: 'testexample.com'
          }
        ]
      };

      expect(() => {
        validateNewUser(testUser);
      }).toThrow();
    });

  });
}



// const add = (a, b) => {
//   if (typeof b !== 'number') {
//     return a + a;
//   }
//   return a + b;
// };
//
// const square = (a) => a * a;
//
// describe('add', function () {
//   it('should add two numbers', function () {
//     const result = add(11, 9);
//
//     expect(result).toBe(20);
//     // if (result !== 20) {
//     //   throw new Error('Sum was not equal to the expected value');
//     // }
//   });
//
//   it('should double a single number', function () {
//     const res = add(44);
//
//     expect(res).toBe(88);
//     // if (res !== 88) {
//     //   throw new Error('Number was not doubled');
//     // }
//   });
//
// });
//
// describe('square', function () {
//   it('should square a number', function () {
//     const sqr = square(3);
//
//     expect(sqr).toBe(9);
//     // if (sqr !== 9) {
//     //   throw new Error('Number was not squared')
//     // }
//   })
// });
