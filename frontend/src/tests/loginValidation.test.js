import { validateUsername, validatePassword } from "../utils/loginValidation"

describe('Login Validation Tests - Username', () => {
    // Test username hợp lệ
    test('TC1: Username hop le - khong co loi', () => {
        expect(validateUsername('Admin123')).toBe('');
    });
    // Test username truyền vào là rỗng
    test('TC2: Username rong - nen tra ve loi', () => {
        expect(validateUsername('')).toBe('Ten dang nhap khong duoc de trong');
    });
    // Test username truyền vào chứa các ký tự đặc biệt
    test('TC3: Username chua cac ky tu dac biet -  nen tra ve loi', () => {
        expect(validateUsername('Admin@123')).toBe('Username chi chua cac ky tu a-z, A-Z, 0-9 và "_"')
    });
    // Test username quá ngắn và dài
    test('TC4.1: Username qua ngan - nen tra ve loi', () => {
        expect(validateUsername('aa')).toBe('Ten dang nhap phai co do dai tu 3-50 ky tu');
    })
    test('TC4.2: Username qua dai - nen tra ve loi', () => {
        expect(validateUsername('aaaaaaaaaa.aaaaaaaaaa.aaaaaaaaaa.aaaaaaaaaaaaaa.aaaaaaaaaa'))
            .toBe('Ten dang nhap phai co do dai tu 3-50 ky tu');
    });
    // Test username chứa khoảng trắng
    test('TC5: Username chua khoang trang - nen tra ve loi', () => {
        expect(validateUsername('Admin 123 ')).toBe('Username khong ton tai khoang trang');
    });
})

describe('Login Validation Tests - Password', () => {
    // Test password rỗng
    test('TC6: Password rong - nen tra ve loi', () => {
        expect(validatePassword('')).toBe('Password khong duoc de trong');
    });
    // Test password quá ngắn
    test('TC7.1: Password qua ngan - nen tra ve loi', () => {
        expect(validatePassword('12345')).toBe('Password co do dai tu 6-100 ky tu');
    });
    // Test password quá dài
    test('TC7.2: Password qua dai - nen tra ve loi', () => {
        expect(validatePassword('aaaaaaaaaa.aaaaaaaaaa.aaaaaaaaaa.aaaaaaaaaa.aaaaaaaaaa'
            + ' aaaaaaaaaa.aaaaaaaaaa.aaaaaaaaaa.aaaaaaaaaa.aaaaaaaaaa'
        ))
            .toBe('Password co do dai tu 6-100 ky tu');
    });
    // Test password tồn tại khoảng tragnws
    test('TC8: Password chua khoang trang - nen tra ve loi', () => {
        expect(validatePassword('1 2 3 4 5')).toBe('Password khong ton tai khoang trang');
    })
    // Test password không đúng định dạng
    test('TC9: Password khong dung dinh dang - nen tra ve loi', () => {
        expect(validatePassword('pass123')).toBe('Password khong dung dinh dang, phai co it nhat 1 chu cai hoa, ' +
            '1 chu cai thuong, 1 so, 1 ky tu dac biet');
    })
    // Test password hợp lệ
    test('TC10: Password hop le - khong co loi', () => {
        expect(validatePassword('123@123Cf')).toBe('');
    })

})
