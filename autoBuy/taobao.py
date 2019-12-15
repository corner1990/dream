# !/usr/bin/env python
# -*- coding: utf-8 -*-
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
import datetime
  
  
def login():
  # 打开淘宝登录页，并进行扫码登录
  browser.get("https://www.taobao.com")
  time.sleep(3)
  if browser.find_element_by_link_text("亲，请登录"):
    browser.find_element_by_link_text("亲，请登录").click()
    print("请在15秒内完成扫码")
    time.sleep(3);
    try:
      browse.find_element_by_id('J_Static2Quick').click();
    except:
      pass;
    
    time.sleep(15)
    # 输入1以后，跳转到用户输入的产品页面
    # if pages == 1:
    #   goGoodsPage();
    # else:
      # goShopCat()
    goShopCat()
  time.sleep(3)
  
  now = datetime.datetime.now()
  print('login success:', now.strftime('%Y-%m-%d %H:%M:%S'))
  times = input("请输入抢购时间，格式如(2019-12-12 18:20:00.000000):")
  # 进入购买程序
  buy(times)
  
# 选择全部商品
def selectAll (choose):
   # 点击购物车里全选按钮
  if choose == 2:
    print("请手动勾选需要购买的商品")
  elif choose == 1:
    while True:
      try:
        if browser.find_element_by_id("J_SelectAll1"):
          browser.find_element_by_id("J_SelectAll1").click()
          break
      except:
        print("找不到全选按钮");
# 结算
def settlement():
  # 点击结算按钮
  while True:
    try:
      if browser.find_element_by_link_text("结 算"):
        browser.find_element_by_link_text("结 算").click()
        print("结算成功")
        break
    except:
      pass;

def submit():
  while True:
    try:
      if browser.find_element_by_link_text('提交订单'):
        browser.find_element_by_link_text('提交订单').click()
        now1 = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f')
        print("抢购成功时间：%s" % now1)
    except:
      print("再次尝试提交订单")
    time.sleep(0.01);


def goGoodsPage():
  goodsPages = input('请输入产品详情url地址：');
  if goodsPages:
    browser.get(goodsPages);

def goShopCat():
  browser.get('https://cart.taobao.com/cart.htm');

  
def buy(times):
  while True:
    now = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f')
    if now > times:
      # 对比时间，时间到的话就点击结算
      # while True:
      #   try:
      #     if browser.find_element_by_xpath('/html/body/div[6]/div/div[3]/div[1]/div[1]/div[1]/div/div[2]/div/div/div[6]/div/div[3]/div[1]/a'):
      #       browser.find_element_by_xpath('/html/body/div[6]/div/div[3]/div[1]/div[1]/div[1]/div/div[2]/div/div/div[6]/div/div[3]/div[1]/a').click()
      #   except:
      #     print("miss");
      
      # 点击结算按钮
      while True:
        try:
          if browser.find_element_by_id("J_Go"):
            browser.find_element_by_id("J_Go").click()
            print("结算成功")
            break
        except:
          pass;
      
      while True:
        try:
          if browser.find_element_by_class_name('go-btn'):
            browser.find_element_by_class_name('go-btn').click()
            now1 = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f')
            print("抢购成功时间：%s" % now1)
        except:
          print("再次尝试提交订单")
        time.sleep(0.01);

  
if __name__ == "__main__":
  # pages = int(input('跳转值商品页面请输入“1”， 跳转到购车从，请输入任意数字:'));
  # 时间格式："2019-12-12 16:28:00.000000"
  # times = int('2019-12-15 19:55:00.000000');
  browser = webdriver.Chrome()
  # browser.maximize_window()
  login()
