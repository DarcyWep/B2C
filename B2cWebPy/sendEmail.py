#encoding: utf-8

# Power By Dazedark And PopMa
# 邮箱验证码的发送

import smtplib
from email.mime.text import MIMEText
from email.utils import formataddr

mySender = '**********'     # 发件人邮箱账号
myPassword = '**********'              # 发件人邮箱密码

def sendEmail(receiver, content):
    '''
        函数功能：发送验证码
        @emailVerifyCode：系统生成的验证码
        @receiver：邮件接收人
        @flag：为0，则为普通发送；为1，则为拆分发送
        函数返回：True发送成功，False发送失败
    '''
    try:
        msg = MIMEText(content, 'plain', 'utf-8')
        msg['From'] = formataddr(["研书屋", mySender])         # 括号里的对应发件人邮箱昵称、发件人邮箱账号
        msg['To'] = formataddr(["收件人", receiver])         # 括号里的对应收件人邮箱昵称、收件人邮箱账号
        msg['Subject'] = "研书屋--注册"                                 # 邮件的主题，也可以说是标题
        server = smtplib.SMTP_SSL("smtp.163.com", 465)          # 发件人邮箱中的SMTP服务器，端口是25
        server.login(mySender, myPassword)                      # 括号中对应的是发件人邮箱账号、邮箱密码
        server.sendmail(mySender, receiver, msg.as_string())   # 括号中对应的是发件人邮箱账号、收件人邮箱账号、发送邮件
        server.quit()                                           # 关闭连接
    except Exception:                                           # 如果 try 中的语句没有执行，则会执行下面的 ret=False
        return False
    return True


# if __name__ == '__main__':
#     result = sendmail('testing', '1374751295@qq.com')
    # print(result)
