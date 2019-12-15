from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC;
from threading import Timer;
import sched;


driver = webdriver.Chrome()
driver.implicitly_wait(20)
# 隐式等待
driver.get("https://www.baidu.com/")
assert "百度一下，你就知道" in driver.title
elem = driver.find_element_by_id('kw')
elem.clear()
elem.send_keys("chrome")

# elem.send_keys(Keys.RETURN)
# reqBtn = driver.find_element_by_id('su')
# reqBtn.click()
# wait = WebDriverWait(driver, 20)
# # driver.execute_script('window.scrollTo(0, 500)')
# # wait.until(EC.title_is('chrome_百度搜索'))

# num = 10
# def checkEl(num):
#     # title1 = EC.title_is('chrome_百度搜索');
#     # print(title1(driver))
#     if num == 10:
#         num = 0;
#         t = Timer(10, checkEl, (num,))
        
#         print('num:', num);
#         t.start()
#     else:
#         driver.execute_script('window.scrollTo(0, 500)');
#         # assert "chrome_百度搜索" not in driver.title;
#         title1 = EC.title_is('chrome_百度搜索');
#         print(title1(driver))
#         print('twoice')


# checkEl(num)

# driver.close()

# 使用定时器
# from datetime import datetime
# from threading import Timer
# # 打印时间函数
# def prinTime(inc):
#     print(datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
#     t = Timer(inc, prinTime,(inc,))
#     t.start()

# prinTime(0.001)


# import sched
# import time
# from datetime import datetime
# # 初始化sched模块的scheduler类
# # 第一个参数是一个可以返回时间戳的函数，第二参数可以在定时未到达之前阻塞
# schdule = sched.scheduler(time.time, time.sleep)
# # 被周期性调度触发函数
# def printTime(inc):
#     print(datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
#     schdule.enter(inc, 0, printTime, (inc,))
# # 默认参数60s
# def main(inc=60):
#     # enter四个参数分别为：间隔事件,优先级（用于同时到达两个事件同时执行的顺序），被调度触发的函数
#     # 给该触发器函数的参数（tuple形式）
#     schdule.enter(0, 0, printTime, (inc,))
#     schdule.run()
# # 5秒输出一次
# main(5)

# from APScheduler.schedulers.blocking import BlockingScheduler
# from datetime import datetime

# # 输出时间
# def job():
#     print(datetime.now().strtime("%Y-%m-%d %H:%M:%S"))
# BlockingScheduler
# scheduler = BlockingScheduler()
# scheduler.add_job(job, "cron", day_of_week="1-5", hour=6, minute=30)
# schduler.start()