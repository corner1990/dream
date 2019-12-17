# !/usr/bin/env python
# -*- coding: utf-8 -*-
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver import ChromeOptions
import time
import datetime
from user_info import userInfo

  
def inputInfo(browser):
  time.sleep(5);
  user = userInfo[0];
  try:
    name = "document.querySelector('#fm-login-id').value=" + str(user.get('account'))
    print('name => %s' % name)
    # name.send_keys(user.get('account'));
    browser.execute_async_script(name)
    # password.send_keys(user.get('password'));
    print('input')
  except:
    print('input throw error')
    pass;


def login():
  # 打开淘宝登录页，并进行扫码登录
  browser.get("https://www.damai.cn/")
  time.sleep(2)
  browser.maximize_window()
  browser.find_element_by_class_name('span-user').click()
  
  inputInfo(browser)
  # browser.find_element_by_xpath('/html/body/div[1]/div/div[1]/div[3]').click()
  time.sleep(1200)
  browser.get('https://detail.damai.cn/item.htm?id=609530171491');
  now = datetime.datetime.now()
  print('login success:', now.strftime('%Y-%m-%d %H:%M:%S'))
  times = input("请输入抢购时间，格式如(2019-12-12 18:20:00.000000):")
  # 进入购买程序
  buy(times)

def buy(times):
  isSelscted = True;
  while True:
    now = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f')
    if now > times:
      # 点击结算按钮
      while True:
        
        try:
          if browser.find_element_by_class_name('buybtn'):
            browser.find_element_by_class_name('buybtn').click()
            now1 = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f')
            print("抢购成功时间：%s" % now1)
        
        except:
          print("立即预定")
        if isSelscted:
          try:
              if browser.find_element_by_class_name('next-checkbox-label'):
                  browser.find_element_by_class_name('next-checkbox-label').click()
                  now1 = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f')
          except:
              print("选择观影人")
          isSelscted = False;
        try:
            if browser.find_element_by_css_selector('.submit-wrapper .next-btn'):
                browser.find_element_by_css_selector('.submit-wrapper .next-btn').click()
                now1 = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f')
        except:
            print("重新下单")
        time.sleep(0.01);

  
if __name__ == "__main__":
  # pages = int(input('跳转值商品页面请输入“1”， 跳转到购车从，请输入任意数字:'));
  # 时间格式："2019-12-12 18:18:00.000000"
  # times = int('2019-12-16 18:31:58.000000');
  option = ChromeOptions()
  option.add_experimental_option('excludeSwitches', ['enable-automation'])
  browser = webdriver.Chrome(options = option)
  # browser.maximize_window()
  
  login()
