# !/usr/bin/env python
# -*- coding: utf-8 -*-
# 淘宝秒杀脚本，扫码登录版
from selenium import webdriver
import datetime
import time
  
  
def login(goodsPage):
  # 打开淘宝登录页，并进行扫码登录
  browser.get("https://www.taobao.com")
  time.sleep(3)
  if browser.find_element_by_link_text("亲，请登录"):
    browser.find_element_by_link_text("亲，请登录").click()
    print("请在15秒内完成扫码")
    time.sleep(15)
    browser.get(goodsPage)
  time.sleep(3)
  
  now = datetime.datetime.now()
  print('login success:', now.strftime('%Y-%m-%d %H:%M:%S'))
  
  
  
def buy(times):
 
  while True:
    now = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f')
    # 对比时间，时间到的话就点击结算
    if now > times:
      while True:
        try:
          if browser.find_element_by_id("J_LinkBuy"):
            browser.find_element_by_id("J_LinkBuy").click()
            break
        except:
          print("找不到购买按钮")
      # 点击结算按钮
      while True:
        try:
          if browser.find_element_by_link_text("结 算"):
            browser.find_element_by_link_text("结 算").click()
            print("结算成功")
            break
        except:
          pass
      # 下单
    #   while True:
    #     try:
    #       if browser.find_element_by_link_text('提交订单'):
    #         browser.find_element_by_link_text('提交订单').click()
    #         now1 = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f')
    #         print("抢购成功时间：%s" % now1)
    #     except:
    #       print("再次尝试提交订单")
    #   time.sleep(0.01)

  
if __name__ == "__main__":
#   times = input("请输入抢购时间，格式如(2019-12-12 18:20:00.000000):")
  # 时间格式："2019-12-12 16:28:00.000000"
  times = '2019-12-12 16:32:00.000000';
  goodsPage = 'https://detail.tmall.com/item.htm?spm=a1z0d.6639537.1997196601.4.7e957484ysMmrv&id=608482418279'

  browser = webdriver.Chrome()
  browser.maximize_window()
  login(goodsPage)
#   choose = int(input("到时间自动勾选购物车请输入“1”，否则输入“2”："))
  buy(times)