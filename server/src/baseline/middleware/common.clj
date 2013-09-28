(ns baseline.middleware.common)

(defmacro route
  [method path & handlers]
  `(~method ~path {params# :params}
            (->> params#
                 ~@handlers)))
