from selenium import webdriver; # 驱动
from selenium.webdriver.common.keys import Keys; # 键盘
from selenium.webdriver.support.ui import WebDriverWait; # 等待寒素
from selenium.webdriver.support import expected_conditions as EC;
from selenium.webdriver.common.action_chains import ActionChains; # 模拟鼠标操作
from threading import Timer; # 定时器
driver = webdriver.Chrome(); # 创建一个实例
import time;

name = 15276513522
pwd = 'Qwe90.11.25'
url = 'https://www.nike.com/cn/'

# 隐式等待
def openPage(url):
    driver.implicitly_wait(20)
    driver.get(url)
    return driver;
# 自动抢
def autoBuy(ua):
    el = ua.find_element_by_xpath()
    pass;
# 选择尺码
def selectGoods(ua):
    size = ua.find_element_by_xpath('/html/body/div[1]/div[2]/div/div/div[3]/div[2]/div[2]/div/div/form/div[1]/fieldset/div/label[10]');
    size.click();
    # 自动抢购
    autoBuy(ua);
# 跳转到产品页面
def goGoodsPage(ua):
    # el1 = ua.find_element_by_xpath('/html/body/div[1]/header/nav[1]/section[2]/div/div[2]/ul/li[2]');
    # 定位到要悬停的元素

    ua.execute_script('window.location.href='+'"https://www.nike.com/cn/t/air-tailwind-79-%E7%94%B7%E5%AD%90%E8%BF%90%E5%8A%A8%E9%9E%8B-KZVRL6/CZ6362-907"')
    time.sleep(2);
    selectGoods(ua);
# 确认登录
def submit(ua):
    btn = ua.find_element_by_xpath('/html/body/div[1]/header/div[2]/div/div[1]/div/div[6]/form/div[7]')
    btn.click();
    go = Timer(3, goGoodsPage, (ua,))
    go.start();


# 输入登录信息
def inputInfo(ua):
    ipt = ua.find_element_by_xpath('/html/body/div[1]/header/div[2]/div/div[1]/div/div[6]/form/div[2]/div[3]/input');
    iptPwd = ua.find_element_by_xpath('/html/body/div[1]/header/div[2]/div/div[1]/div/div[6]/form/div[3]/input')

    # 输入账号和密码
    ipt.send_keys(name)
    iptPwd.send_keys(pwd)
    sub = Timer(2, submit, (ua,));
    sub.start();

# 登录
def login(ua):
    el = ua.find_element_by_xpath('/html/body/div[1]/header/nav[1]/section[1]/div/div/ul[2]/li[1]/div/button')
    el.click();

    # 输入信息
    # inputInfo(ua);
    ipt = Timer(4, inputInfo, (ua,))
    ipt.start()
    
def auto():
    # 打开页面 拿到浏览器对象
    ua = openPage(url);
    # 登录
    t = 4;
    wait = Timer(t, login, (ua,))
    wait.start();

# 开始
auto()
