<template>
    <div class="renting-search-wrapper">
        <div class="flex">
            <el-cascader :options="options" :show-all-levels="false" v-model="city"></el-cascader>
            <el-button @click="handleGoCity" slot="append" icon="el-icon-search" style="background: #ff873f; color: #fff; border-radius: 0 3px 3px 0">搜索</el-button>
        </div>
        <iframe ref="countrycityrenting" frameborder="0" width="1100px" height="600px" srcdoc=""></iframe>
    </div>
</template>

<script>
import { getCountryCityRenting } from '../../api/renting/index';

export default {
    data() {
        return {
            city: [],
            options: [{
                value: '北京',
                label: '北京'
            },
            {
                value: '天津',
                label: '天津',
            },
            {
                value: '上海',
                label: '上海',
            },
            {
                value: '重庆',
                label: '重庆',
            },
            {
                value: '河北',
                label: '河北',
                children: [
                    {
                        value: '石家庄',
                        label: '石家庄',
                    },
                    {
                        value: '唐山',
                        label: '唐山',
                    },
                    {
                        value: '秦皇岛',
                        label: '秦皇岛',
                    },
                    {
                        value: '邯郸',
                        label: '邯郸',
                    },
                    {
                        value: '邢台',
                        label: '邢台',
                    },
                    {
                        value: '保定',
                        label: '保定',
                    },
                    {
                        value: '张家口',
                        label: '张家口',
                    },
                    {
                        value: '承德',
                        label: '承德',
                    },
                    {
                        value: '沧州',
                        label: '沧州',
                    },
                    {
                        value: '廊坊',
                        label: '廊坊',
                    },
                    {
                        value: '衡水',
                        label: '衡水',
                    },
                ]
            },
            {
                value: '山西',
                label: '山西',
                children: [
                    {
                        value: '太原',
                        label: '太原',
                    },
                    {
                        value: '大同',
                        label: '大同',
                    },
                    {
                        value: '长治',
                        label: '长治',
                    },
                    {
                        value: '晋城',
                        label: '晋城',
                    },
                    {
                        value: '朔州',
                        label: '朔州',
                    },
                    {
                        value: '忻州',
                        label: '忻州',
                    },
                    {
                        value: '吕梁',
                        label: '吕梁',
                    },
                    {
                        value: '晋中',
                        label: '晋中',
                    },
                    {
                        value: '临汾',
                        label: '临汾',
                    },
                    {
                        value: '运城',
                        label: '运城',
                    },
                ]
            },
            {
                value: '内蒙古',
                label: '内蒙古',
                children: [
                    {
                        value: '呼和浩特',
                        label: '呼和浩特',
                    },
                    {
                        value: '包头',
                        label: '包头',
                    },
                    {
                        value: '赤峰',
                        label: '赤峰',
                    },
                    {
                        value: '呼伦贝尔',
                        label: '呼伦贝尔',
                    },
                    {
                        value: '通辽',
                        label: '通辽',
                    },
                    {
                        value: '乌兰察布',
                        label: '乌兰察布',
                    },
                    {
                        value: '鄂尔多斯',
                        label: '鄂尔多斯',
                    },
                ]
            },
            {
                value: '辽宁',
                label: '辽宁',
                children: [
                    {
                        value: '沈阳',
                        label: '沈阳',
                    },
                    {
                        value: '大连',
                        label: '大连',
                    },
                    {
                        value: '鞍山',
                        label: '鞍山',
                    },
                    {
                        value: '抚顺',
                        label: '抚顺',
                    },
                    {
                        value: '本溪',
                        label: '本溪',
                    },
                    {
                        value: '丹东',
                        label: '丹东',
                    },
                    {
                        value: '锦州',
                        label: '锦州',
                    },
                    {
                        value: '营口',
                        label: '营口',
                    },
                    {
                        value: '辽阳',
                        label: '辽阳',
                    },
                    {
                        value: '盘锦',
                        label: '盘锦',
                    },
                    {
                        value: '铁岭',
                        label: '铁岭',
                    },
                ]
            },
            {
                value: '吉林',
                label: '吉林',
                children: [
                    {
                        value: '长春',
                        label: '长春',
                    },
                    {
                        value: '吉林',
                        label: '吉林',
                    },
                    {
                        value: '四平',
                        label: '四平',
                    },
                    {
                        value: '通化',
                        label: '通化',
                    },
                    {
                        value: '松原',
                        label: '松原',
                    },
                    {
                        value: '延边',
                        label: '延边',
                    },
                ]
            },
            {
                value: '黑龙江',
                label: '黑龙江',
                children: [
                    {
                        value: '哈尔滨',
                        label: '哈尔滨',
                    },
                    {
                        value: '齐齐哈尔',
                        label: '齐齐哈尔',
                    },
                    {
                        value: '大庆',
                        label: '大庆',
                    },
                    {
                        value: '牡丹江',
                        label: '牡丹江',
                    },
                    {
                        value: '绥化',
                        label: '绥化',
                    },
                ]
            },
            {
                value: '江苏',
                label: '江苏',
                children: [
                    {
                        value: '南京',
                        label: '南京',
                    },
                    {
                        value: '无锡',
                        label: '无锡',
                    },
                    {
                        value: '徐州',
                        label: '徐州',
                    },
                    {
                        value: '常州',
                        label: '常州',
                    },
                    {
                        value: '苏州',
                        label: '苏州',
                    },
                    {
                        value: '南通',
                        label: '南通',
                    },
                    {
                        value: '连云港',
                        label: '连云港',
                    },
                    {
                        value: '淮安',
                        label: '淮安',
                    },
                    {
                        value: '盐城',
                        label: '盐城',
                    },
                    {
                        value: '扬州',
                        label: '扬州',
                    },
                    {
                        value: '镇江',
                        label: '镇江',
                    },
                    {
                        value: '泰州',
                        label: '泰州',
                    },
                ]
            },
            {
                value: '浙江',
                label: '浙江',
                children: [
                    {
                        value: '杭州',
                        label: '杭州',
                    },
                    {
                        value: '宁波',
                        label: '宁波',
                    },
                    {
                        value: '温州',
                        label: '温州',
                    },
                    {
                        value: '嘉兴',
                        label: '嘉兴',
                    },
                    {
                        value: '湖州',
                        label: '湖州',
                    },
                    {
                        value: '绍兴',
                        label: '绍兴',
                    },
                    {
                        value: '金华',
                        label: '金华',
                    },
                    {
                        value: '衢州',
                        label: '衢州',
                    },
                    {
                        value: '台州',
                        label: '台州',
                    },
                    {
                        value: '丽水',
                        label: '丽水',
                    },
                ]
            },
            {
                value: '安徽',
                label: '安徽',
                children: [
                    {
                        value: '合肥',
                        label: '合肥',
                    },
                    {
                        value: '芜湖',
                        label: '芜湖',
                    },
                    {
                        value: '蚌埠',
                        label: '蚌埠',
                    },
                    {
                        value: '马鞍山',
                        label: '马鞍山',
                    },
                    {
                        value: '淮北',
                        label: '淮北',
                    },
                    {
                        value: '铜陵',
                        label: '铜陵',
                    },
                    {
                        value: '安庆',
                        label: '安庆',
                    },
                    {
                        value: '黄山',
                        label: '黄山',
                    },
                    {
                        value: '滁州',
                        label: '滁州',
                    },
                    {
                        value: '阜阳',
                        label: '阜阳',
                    },
                    {
                        value: '宿州',
                        label: '宿州',
                    },
                    {
                        value: '六安',
                        label: '六安',
                    },
                    {
                        value: '宣城',
                        label: '宣城',
                    },
                    {
                        value: '亳州',
                        label: '亳州',
                    },
                    {
                        value: '池州',
                        label: '池州',
                    }
                ]
            },
            {
                value: '福建',
                label: '福建',
                children: [
                    {
                        value: '福州',
                        label: '福州',
                    },
                    {
                        value: '厦门',
                        label: '厦门',
                    },
                    {
                        value: '宁德',
                        label: '宁德',
                    },
                    {
                        value: '莆田',
                        label: '莆田',
                    },
                    {
                        value: '泉州',
                        label: '泉州',
                    },
                    {
                        value: '漳州',
                        label: '漳州',
                    },
                    {
                        value: '龙岩',
                        label: '龙岩',
                    },
                    {
                        value: '三明',
                        label: '三明',
                    },
                    {
                        value: '南平',
                        label: '南平',
                    },
                ]
            },
            {
                value: '江西',
                label: '江西',
                children: [
                    {
                        value: '南昌',
                        label: '南昌',
                    },
                    {
                        value: '九江',
                        label: '九江',
                    },
                    {
                        value: '赣州',
                        label: '赣州',
                    },
                    {
                        value: '宜春',
                        label: '宜春',
                    },
                    {
                        value: '上饶',
                        label: '上饶',
                    },
                    {
                        value: '吉安',
                        label: '吉安',
                    },
                    {
                        value: '抚州',
                        label: '抚州',
                    },
                ]
            },
            {
                value: '山东',
                label: '山东',
                children: [
                    {
                        value: '济南',
                        label: '济南',
                    },
                    {
                        value: '青岛',
                        label: '青岛',
                    },
                    {
                        value: '淄博',
                        label: '淄博',
                    },
                    {
                        value: '枣庄',
                        label: '枣庄',
                    },
                    {
                        value: '东营',
                        label: '东营',
                    },
                    {
                        value: '烟台',
                        label: '烟台',
                    },
                    {
                        value: '潍坊',
                        label: '潍坊',
                    },
                    {
                        value: '济宁',
                        label: '济宁',
                    },
                    {
                        value: '泰安',
                        label: '泰安',
                    },
                    {
                        value: '威海',
                        label: '威海',
                    },
                    {
                        value: '日照',
                        label: '日照',
                    },
                    {
                        value: '临沂',
                        label: '临沂',
                    },
                    {
                        value: '德州',
                        label: '德州',
                    },
                    {
                        value: '聊城',
                        label: '聊城',
                    },
                    {
                        value: '滨州',
                        label: '滨州',
                    },
                    {
                        value: '菏泽',
                        label: '菏泽',
                    },
                ]
            },
            {
                value: '河南',
                label: '河南',
                children: [
                    {
                        value: '郑州',
                        label: '郑州',
                    },
                    {
                        value: '开封',
                        label: '开封',
                    },
                    {
                        value: '洛阳',
                        label: '洛阳',
                    },
                    {
                        value: '平顶山',
                        label: '平顶山',
                    },
                    {
                        value: '安阳',
                        label: '安阳',
                    },
                    {
                        value: '新乡',
                        label: '新乡',
                    },
                    {
                        value: '焦作',
                        label: '焦作',
                    },
                    {
                        value: '濮阳',
                        label: '濮阳',
                    },
                    {
                        value: '许昌',
                        label: '许昌',
                    },
                    {
                        value: '三门峡',
                        label: '三门峡',
                    },
                    {
                        value: '南阳',
                        label: '南阳',
                    },
                    {
                        value: '商丘',
                        label: '商丘',
                    },
                    {
                        value: '信阳',
                        label: '信阳',
                    },
                    {
                        value: '周口',
                        label: '周口',
                    },
                    {
                        value: '驻马店',
                        label: '驻马店',
                    },
                ]
            },
            {
                value: '湖北',
                label: '湖北',
                children: [
                    {
                        value: '武汉',
                        label: '武汉',
                    },
                    {
                        value: '黄石',
                        label: '黄石',
                    },
                    {
                        value: '十堰',
                        label: '十堰',
                    },
                    {
                        value: '宜昌',
                        label: '宜昌',
                    },
                    {
                        value: '襄阳',
                        label: '襄阳',
                    },
                    {
                        value: '荆门',
                        label: '荆门',
                    },
                    {
                        value: '孝感',
                        label: '孝感',
                    },
                    {
                        value: '荆州',
                        label: '荆州',
                    },
                    {
                        value: '黄冈',
                        label: '黄冈',
                    },
                ]
            },
            {
                value: '湖南',
                label: '湖南',
                children: [
                    {
                        value: '长沙',
                        label: '长沙',
                    },
                    {
                        value: '株洲',
                        label: '株洲',
                    },
                    {
                        value: '湘潭',
                        label: '湘潭',
                    },
                    {
                        value: '邵阳',
                        label: '邵阳',
                    },
                    {
                        value: '岳阳',
                        label: '岳阳',
                    },
                    {
                        value: '常德',
                        label: '常德',
                    },
                    {
                        value: '益阳',
                        label: '益阳',
                    },
                    {
                        value: '郴州',
                        label: '郴州',
                    },
                    {
                        value: '永州',
                        label: '永州',
                    },
                    {
                        value: '怀化',
                        label: '怀化',
                    },
                    {
                        value: '娄底',
                        label: '娄底',
                    },
                    {
                        value: '湘西',
                        label: '湘西',
                    },
                ]
            },
            {
                value: '广东',
                label: '广东',
                children: [
                    {
                        value: '广州',
                        label: '广州',
                    },
                    {
                        value: '韶关',
                        label: '韶关',
                    },
                    {
                        value: '深圳',
                        label: '深圳',
                    },
                    {
                        value: '珠海',
                        label: '珠海',
                    },
                    {
                        value: '汕头',
                        label: '汕头',
                    },
                    {
                        value: '佛山',
                        label: '佛山',
                    },
                    {
                        value: '江门',
                        label: '江门',
                    },
                    {
                        value: '湛江',
                        label: '湛江',
                    },
                    {
                        value: '茂名',
                        label: '茂名',
                    },
                    {
                        value: '肇庆',
                        label: '肇庆',
                    },
                    {
                        value: '惠州',
                        label: '惠州',
                    },
                    {
                        value: '阳江',
                        label: '阳江',
                    },
                    {
                        value: '清远',
                        label: '清远',
                    },
                    {
                        value: '东莞',
                        label: '东莞',
                    },
                    {
                        value: '中山',
                        label: '中山',
                    },
                    {
                        value: '揭阳',
                        label: '揭阳',
                    },
                ]
            },
            {
                value: '广西',
                label: '广西',
                children: [
                    {
                        value: '南宁',
                        label: '南宁',
                    },
                    {
                        value: '柳州',
                        label: '柳州',
                    },
                    {
                        value: '桂林',
                        label: '桂林',
                    },
                    {
                        value: '玉林',
                        label: '玉林',
                    },
                ]
            },
            {
                value: '海南',
                label: '海南',
                children: [
                    {
                        value: '海口',
                        label: '海口',
                    },
                    {
                        value: '三亚',
                        label: '三亚',
                    },
                ]
            },
            {
                value: '四川',
                label: '四川',
                children: [
                    {
                        value: '成都',
                        label: '成都',
                    },
                    {
                        value: '自贡',
                        label: '自贡',
                    },
                    {
                        value: '攀枝花',
                        label: '攀枝花',
                    },
                    {
                        value: '泸州',
                        label: '泸州',
                    },
                    {
                        value: '德阳',
                        label: '德阳',
                    },
                    {
                        value: '绵阳',
                        label: '绵阳',
                    },
                    {
                        value: '广元',
                        label: '广元',
                    },
                    {
                        value: '内江',
                        label: '内江',
                    },
                    {
                        value: '乐山',
                        label: '乐山',
                    },
                    {
                        value: '南充',
                        label: '南充',
                    },
                    {
                        value: '宜宾',
                        label: '宜宾',
                    },
                    {
                        value: '达州',
                        label: '达州',
                    },
                    {
                        value: '雅安',
                        label: '雅安',
                    },
                    {
                        value: '资阳',
                        label: '资阳',
                    },
                ]
            },
            {
                value: '贵州',
                label: '贵州',
                children: [
                    {
                        value: '贵阳',
                        label: '贵阳',
                    },
                    {
                        value: '六盘水',
                        label: '六盘水',
                    },
                    {
                        value: '遵义',
                        label: '遵义',
                    },
                    {
                        value: '毕节',
                        label: '毕节',
                    },
                    {
                        value: '安顺',
                        label: '安顺',
                    },
                ]
            },
            {
                value: '云南',
                label: '云南',
                children: [
                    {
                        value: '昆明',
                        label: '昆明',
                    },
                    {
                        value: '曲靖',
                        label: '曲靖',
                    },
                    {
                        value: '玉溪',
                        label: '玉溪',
                    },
                    {
                        value: '普洱',
                        label: '普洱',
                    },
                    {
                        value: '保山',
                        label: '保山',
                    },
                    {
                        value: '临沧',
                        label: '临沧',
                    }
                ]
            },
            {
                value: '陕西',
                label: '陕西',
                children: [
                    {
                        value: '西安',
                        label: '西安',
                    },
                    {
                        value: '宝鸡',
                        label: '宝鸡',
                    },
                    {
                        value: '咸阳',
                        label: '咸阳',
                    },
                    {
                        value: '渭南',
                        label: '渭南',
                    },
                    {
                        value: '延安',
                        label: '延安',
                    },
                    {
                        value: '汉中',
                        label: '汉中',
                    },
                    {
                        value: '榆林',
                        label: '榆林',
                    },
                ]
            },
            {
                value: '甘肃',
                label: '甘肃',
                children: [
                    {
                        value: '兰州',
                        label: '兰州',
                    },
                ]
            },
            {
                value: '青海',
                label: '青海',
                children: [
                    {
                        value: '西宁',
                        label: '西宁',
                    },
                ]
            },
            {
                value: '宁夏',
                label: '宁夏',
                children: [
                    {
                        value: '银川',
                        label: '银川',
                    },
                    {
                        value: '石嘴山',
                        label: '石嘴山',
                    }
                ]
            },
            {
                value: '新疆',
                label: '新疆',
                children: [
                    {
                        value: '乌鲁木齐',
                        label: '乌鲁木齐',
                    },
                    {
                        value: '克拉玛依',
                        label: '克拉玛依',
                    },
                    {
                        value: '阿克苏',
                        label: '阿克苏',
                    },
                    {
                        value: '伊犁',
                        label: '伊犁',
                    }
                ]
            },
            ]
        }
    },
    created() {
        getCountryCityRenting().then(
            res => {
                this.$refs.countrycityrenting.srcdoc = res.Data;
            }
        )
    },
    methods: {
        handleGoCity() {
            if (this.city.length > 0) {
                if (this.city.length === 1) {
                    this.$router.push({
                        path: '/renting',
                        query: {
                            City: this.city[0],
                        }
                    });
                } else {
                    this.$router.push({
                        path: '/renting',
                        query: {
                            City: this.city[1],
                        }
                    });
                }
            }
        }
    }
}
</script>

<style scoped>
.renting-search-wrapper {
    height: calc(100vh - 80px);
    background: #F8F9F9;
    padding: 15px;
}

.flex {
    display: flex;
}

</style>
