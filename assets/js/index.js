/**
 * 
 * @authors cherish yii2 (cherish@cherish.pw)
 * @date    2020-12-10 16:48:28
 * @version v1.0
 * @description the core js of todolist project
 * 
 * ━━━━━━神兽出没━━━━━━
 * 　　   ┏┓　 ┏┓
 * 　┏━━━━┛┻━━━┛┻━━━┓
 * 　┃              ┃
 * 　┃       ━　    ┃
 * 　┃　  ┳┛ 　┗┳   ┃
 * 　┃              ┃
 * 　┃       ┻　    ┃
 * 　┃              ┃
 * 　┗━━━┓      ┏━━━┛ Code is far away from bugs with the animal protecting.
 *       ┃      ┃     神兽保佑,代码无bug。
 *       ┃      ┃
 *       ┃      ┗━━━┓
 *       ┃      　　┣┓
 *       ┃      　　┏┛
 *       ┗━┓┓┏━━┳┓┏━┛
 *     　  ┃┫┫　┃┫┫
 *     　  ┗┻┛　┗┻┛
 *
 * ━━━━━━感觉萌萌哒━━━━━━
 */

// 请根据考试说明文档中列出的需求进行作答
// 预祝各位顺利通过本次考试，see you next week！
// ...
$(function () {



    $('form').submit(function(e){
        e.preventDefault();
    });
    
    //渲染页面
    
    

    
    const a1 = JSON.parse(window.localStorage.getItem('arr3')) || []
    const a2  = JSON.parse(window.localStorage.getItem('arr4')) || []
    
    bindHtml()
    
    function bindHtml() {




        // console.log(a1)
        // console.log(a2)
        
        let str = ''

        str += `
        <h2 class="ing">正在进行 <span id="todocount">${a1.length}</span></h2>
        <ol id="todolist" class="demo-box">
        `

        a1.forEach((item,index) => {
            str +=`
            <li>
                <input type="checkbox" />
                <p>${item}</p>
                <a href="" onclick="return false;">-</a>
            </li>
            `
        })


        str += `

        </ol>
        <h2>已经完成 <span id="donecount">${a2.length}</span></h2>
        <ul id="donelist">

        `
        a2.forEach((item,index) => {
            str +=`
            <li>
                <input type="checkbox" checked="checked" />
                <p>${item}</p>
                <a href="" onclick="return false;">-</a>
            </li>
            `
        })

        str += `
        </ul>
        `

       
        $('#tbody').html(str)

    }

    //添加数据
    
    $('#title').keypress(function (e) { 
        if(e.keyCode ==13 ){
            
            let a = $.trim($('#title').val())
            if (!a) {
                alert('请完整填写表单')
                return
              }
            a1.push(a)
            $('#title').val('')
        }
        window.localStorage.setItem('arr3', JSON.stringify(a1))
        window.localStorage.setItem('arr4', JSON.stringify(a2))
        bindHtml()
    })

    //切换
    $('#tbody').on('click', 'ol input', function () {
        const b = $(this).next().text()
        for (let i = 0; i < a1.length; i++) {
            if( a1[i] == b){
                a2.push(a1[i])
                a1.splice(i, 1)
                // i--
                break
            }
        }
        window.localStorage.setItem('arr3', JSON.stringify(a1))
        window.localStorage.setItem('arr4', JSON.stringify(a2))
        bindHtml()

    })


    //切换
    $('#tbody').on('click', 'ul input', function () {
        const b = $(this).next().text()
        for (let i = 0; i < a2.length; i++) {
            if( a2[i] == b){
                a1.push(a2[i])
                a2.splice(i, 1)
                break        
            }
        }
        bindHtml()
        window.localStorage.setItem('arr3', JSON.stringify(a1))
        window.localStorage.setItem('arr4', JSON.stringify(a2))
    })

    // 删除
    $('#tbody').on('click', 'ol a', function () {
        const b = $(this).prev().text()
        for (let i = 0; i < a1.length; i++) {
            if( a1[i] == b){
                a1.splice(i, 1)
                break        
            }
        }
        bindHtml()
        window.localStorage.setItem('arr3', JSON.stringify(a1))
        window.localStorage.setItem('arr4', JSON.stringify(a2))
    })


    // 删除
    $('#tbody').on('click', 'ul a', function () {
        const b = $(this).prev().text()
        for (let i = 0; i < a2.length; i++) {
            if( a2[i] == b){
                a2.splice(i, 1)
                break        
            }
        }
        bindHtml()
        window.localStorage.setItem('arr3', JSON.stringify(a1))
        window.localStorage.setItem('arr4', JSON.stringify(a2))
    })



    // 编辑
    $('#tbody').on('click', 'ol p', function () {

        let input = $("<input type='text'>")
        input.css("font-size", "16px")
        let p = $(this);
        const ab = p.text()
        console.log(ab)
        
        input.width(p.width());
        input.css("background-color", p.css("background-color"))
        input.val('')
        p.html("")      
        input.appendTo(p)
        input.get(0).select();
        input.click(function () {
 
            return false;
        })
        input.change(function (event) {            
        
            var inputtext = $(this).val()
            p.html(inputtext);

            for (let i = 0; i < a1.length; i++) {
                if( a1[i] == ab){
                    a1.splice(i, 1,inputtext)
                    break        
                }
            }
            bindHtml()
            window.localStorage.setItem('arr3', JSON.stringify(a1))
            window.localStorage.setItem('arr4', JSON.stringify(a2))
        })
    })


    $('#tbody').on('click', 'ul p', function () {

        let input = $("<input type='text'>")
        input.css("font-size", "16px")
        let p = $(this)
        const ab = p.text()
        // console.log(ab)
        
        input.width(p.width())
        input.css("background-color", p.css("background-color"))
        input.val('')
        p.html("")      
        input.appendTo(p)
        input.get(0).select();
        input.click(function () {
 
            return false;
        })
        input.change(function (event) {            
        
            var inputtext = $(this).val()
            p.html(inputtext);

            for (let i = 0; i < a2.length; i++) {
                if( a2[i] == ab){
                    a2.splice(i, 1,inputtext)
                    break        
                }
            }
            bindHtml()
            window.localStorage.setItem('arr3', JSON.stringify(a1))
            window.localStorage.setItem('arr4', JSON.stringify(a2))
        })

    })


    const xhr = new XMLHttpRequest()

    xhr.open('GET', '/dt', false)

    xhr.addEventListener('load', function () {
        const res = JSON.parse(xhr.responseText)
        console.log(res)

        $('#ipv4').html(res.ip)
        $('#addr').html(res.country + res.area)

    })

    xhr.send()

})



