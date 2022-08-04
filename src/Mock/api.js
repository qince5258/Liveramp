import Mock from "mockjs";

// 模拟延迟
Mock.setup({
  timeout: 500,
});

function getParams(url) {
  const args = url.split("?");
  args.shift();
  const params = {};
  args.forEach((item) => {
    const [key, Val] = item.split("=");
    params[key] = Val;
  });
  return params;
}

// 生成随机数据
export default Mock.mock(RegExp(`/api` + ".*"), "get", function (options) {
  const { term } = getParams(options.url);
  const data = getData(term)
  return Mock.mock({
    code: 1,
    msg: "",
    result: data
  });
});

const mockData = {
  Age: [1,10,20,30,40,50],
  Education: ["PHD","College","Graduate","HighSchool","Others","Unversity"],
  Gender: ["male","female"],
  AdultComposition: ["AbbreviatedFamily","2Persons","4Persons","3Persons"],
  PresenceofChild: [1,2,3,4,5,6]
}

function getData(key) {
  const data = mockData[key];
  const res = data.map(args => {
    return {
      value : args,
      count: parseInt(Math.random()*200)
    }
  })
  return res
}
