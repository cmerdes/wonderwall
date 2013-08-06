PX = window.PX || {};

// model
PX.Employee = Backbone.Model.extend({
    defaults: {
        firstname: null,
        lastname: null,
        position: null
    }
});

// collection
(function () {
    var EmployeeList;

    EmployeeList = Backbone.Collection.extend({
        model: PX.Employee,
        url: '/api/employees',
        initialize: function () {
            this.fetch({
                success: this.fetchSuccess,
                error: this.fetchError
            });
            this.deferred = new $.Deferred();
        },
        deferred: Function.constructor.prototype,
        fetchSuccess: function (collection, response) {
            collection.deferred.resolve();
        },
        fetchError: function (collection, response) {
            throw new Error("Products fetch did get collection from API");
        }
    });

    PX.employees = new EmployeeList();
    EmployeeList = null;
}());


PX.EmployeeListItemView = Backbone.View.extend({
    tagName: "li",
    className: "employee",
    events: {
        "click": "showEmployeeDetails"
    },
    initialize: function (options) {
        this.template = $('#employee-template').html();
    },
    render: function () {
        var markup = Mustache.to_html(this.template, this.model.toJSON());
        this.$el.html(markup).attr('id',this.model.get('_id'));
        return this;
    },
    showEmployeeDetails: function(event) {
        var targ = $(event.target), pid = targ.attr(id), dest;
        event.preventDefault();
        dest = "employees/" + ( (pid) ? pid : targ.closest('li').attr('id') );
        console.log("Show employee details: " + pid);
        PX.app.navigate(dest);
    }
});

PX.EmployeeListView = Backbone.View.extend({
    tagName: "ul",
    className: "employees",
    render: function () {
        for (var i = 0; i < this.collection.length; i++) {
            this.renderItem(this.collection.models[i]);
        };
        $(this.container).find(this.className).remove();
        this.$el.appendTo(this.options.container);
        return this;
    },
    renderItem: function (model) {
        var item = new PX.EmployeeListItemView({
            "model": model
        });
        item.render().$el.appendTo(this.$el);
    }
});

PX.EmployeeDetailsView = Backbone.View.extend({
    el: "#container",
    initialize: function (options) {
        this.render();
    },
    render: function () {
        this.$el.html("TODO ADD A EMPLOYEE DETAILS Model, View and Template")
    }
});

// application
PX.App = Backbone.Router.extend({
    routes: {
        "/": "listEmployees",
        "list": "listEmployees",
        "employees/:id": "showEmployeeDetails"
    },
    //initialize: function (options) {},
    listEmployees: function () {
        var employeesList = new PX.EmployeeListView({
            "container": $('#container'),
            "collection": PX.employees
        });
        PX.employees.deferred.done(function () {
            employeesList.render();
        });
    },
    showEmployeeDetails: function () {
        var employeeDetails = new PX.EmployeeDetailsView();
    }
});

// bootstrap
PX.app = new PX.App();
Backbone.history.start();