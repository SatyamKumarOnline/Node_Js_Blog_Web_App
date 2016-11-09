/**
 * Created by kumars on 26/10/16.
 */

var Blog = function() {

};

Blog.showForm = function(ev){
    ev.preventDefault();
    $(this).tab('show');
    document.forms[0].style.display = '';
};

/* To do :- Optimization stuff, donot fire 'showAll' request on
   clicking ALLPost Tab, think of some other logic.
 */


Blog.showAllBlog = function(ev){
            ev.preventDefault();
            $(this).tab('show');
            document.forms[0].style.display = 'none';
            // To do: - fire request to fetch the blog content, showAll
    $.ajax({
        url : '/showAll',
        async : true
    }).done(function(resData){
        var blogData = resData;
        Blog.constructBlogUI(resData);
        console.log(resData);
        // write code to show the JSON response data in UI.
    });
};

Blog.constructBlogUI = function(resData){
    blogDataNode = document.querySelector('[data-blog="detail"]');
    var _div = document.querySelector('.container');
    resData.forEach(function(value,key){
        if(value) {
            console.log("value is :: ",value);
            var title = value.title,
                content = value.content,
                blogDate = value.DOC,
                clonedBlogDataNode = blogDataNode.cloneNode(true);

            clonedBlogDataNode.getElementsByTagName('h4')[0].innerText = title;
            clonedBlogDataNode.getElementsByTagName('p')[0].innerText = content;

            _div.appendChild(clonedBlogDataNode);

        }
    });
};





