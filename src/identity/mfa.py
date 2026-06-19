import hashlib

def enroll_totp(user_id, secret):
    return {'user_id': user_id, 'secret': secret, 'enabled': True}

def verify_totp(enrollment, code):
    return bool(enrollment.get('enabled')) and len(str(code)) == 6
