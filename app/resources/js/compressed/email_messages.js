!function(a){var b=Garnish.Base.extend({messages:null,init:function(){this.messages=[];for(var b=a("#messages"),d=b.find(".message"),e=0;e<d.length;e++){var f=new c(d[e]);this.messages.push(f)}}}),c=Garnish.Base.extend({$container:null,key:null,$subject:null,$body:null,modal:null,init:function(b){this.$container=a(b),this.key=this.$container.attr("data-key"),this.$subject=this.$container.find(".subject:first"),this.$body=this.$container.find(".body:first"),this.addListener(this.$container,"click","edit")},edit:function(){this.modal?this.modal.show():this.modal=new d(this)},updateHtmlFromModal:function(){var a=this.modal.$subjectInput.val(),b=Craft.escapeHtml(this.modal.$bodyInput.val()).replace(/\n/g,"<br>");this.$subject.text(a),this.$body.html(b)}}),d=Garnish.Modal.extend({message:null,$localeSelect:null,$subjectInput:null,$bodyInput:null,$saveBtn:null,$cancelBtn:null,$spinner:null,loading:!1,init:function(a){this.message=a,this.base(null,{resizable:!0}),this.loadContainer()},loadContainer:function(b){var c={key:this.message.key,locale:b};"undefined"!=typeof Craft.csrfTokenName&&"undefined"!=typeof Craft.csrfTokenValue&&(c[Craft.csrfTokenName]=Craft.csrfTokenValue),a.post(Craft.getUrl("settings/email/_message_modal"),c,a.proxy(function(b,c,d){if("success"==c){if(this.$container)this.$container.html(b);else{var e=a('<form class="modal fitted message-settings" accept-charset="UTF-8">'+b+"</form>").appendTo(Garnish.$bod);this.setContainer(e),this.show()}this.$localeSelect=this.$container.find(".locale:first > select"),this.$subjectInput=this.$container.find(".message-subject:first"),this.$bodyInput=this.$container.find(".message-body:first"),this.$saveBtn=this.$container.find(".submit:first"),this.$cancelBtn=this.$container.find(".cancel:first"),this.$spinner=this.$container.find(".spinner:first"),this.addListener(this.$localeSelect,"change","switchLocale"),this.addListener(this.$container,"submit","saveMessage"),this.addListener(this.$cancelBtn,"click","cancel"),setTimeout(a.proxy(function(){this.$subjectInput.trigger("focus")},this),100)}},this))},switchLocale:function(){var a=this.$localeSelect.val();this.loadContainer(a)},saveMessage:function(b){if(b.preventDefault(),!this.loading){var c={key:this.message.key,locale:this.$localeSelect.length?this.$localeSelect.val():Craft.locale,subject:this.$subjectInput.val(),body:this.$bodyInput.val()};if(this.$subjectInput.removeClass("error"),this.$bodyInput.removeClass("error"),!c.subject||!c.body)return c.subject||this.$subjectInput.addClass("error"),c.body||this.$bodyInput.addClass("error"),void Garnish.shake(this.$container);this.loading=!0,this.$saveBtn.addClass("active"),this.$spinner.show(),Craft.postActionRequest("emailMessages/saveMessage",c,a.proxy(function(a,b){this.$saveBtn.removeClass("active"),this.$spinner.hide(),this.loading=!1,"success"==b&&(a.success?(c.locale==Craft.locale&&this.message.updateHtmlFromModal(),this.hide(),Craft.cp.displayNotice(Craft.t("Message saved."))):Craft.cp.displayError())},this))}},cancel:function(){this.hide(),this.message&&(this.message.modal=null)}});new b}(jQuery);
//# sourceMappingURL=email_messages.js.map