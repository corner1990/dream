# !/usr/bin/env python
# -*- coding: utf-8 -*-
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
import datetime
  
  
def login():
  # 打开淘宝登录页，并进行扫码登录
  browser.get("https://www.damai.cn/")

  time.sleep(2)
  browser.find_element_by_class_name('span-user').click()
  time.sleep(3)
  browser.find_element_by_xpath('/html/body/div[1]/div/div[1]/div[3]').click()
  time.sleep(12)
  browser.get('https://detail.damai.cn/item.htm?id=609530171491');
  now = datetime.datetime.now()
  print('login success:', now.strftime('%Y-%m-%d %H:%M:%S'))
  times = input("请输入抢购时间，格式如(2019-12-12 18:20:00.000000):")
  # 进入购买程序
  buy(times)

def buy(times):
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
        try:
            if browser.find_element_by_class_name('next-checkbox-label'):
                browser.find_element_by_class_name('next-checkbox-label').click()
                now1 = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f')
        except:
            print("选择观影人")
        try:
            if browser.find_element_by_class_name('next-btn'):
                browser.find_element_by_class_name('next-btn').click()
                now1 = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f')
        except:
            print("重新下单")
        time.sleep(0.01);

  
if __name__ == "__main__":
  # pages = int(input('跳转值商品页面请输入“1”， 跳转到购车从，请输入任意数字:'));
  # 时间格式："2019-12-12 18:18:00.000000"
  # times = int('2019-12-16 18:31:58.000000');
  browser = webdriver.Chrome()
  # browser.maximize_window()
  login()
